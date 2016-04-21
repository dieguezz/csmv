/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  update
 * DELETE  /api/things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Sitemap = require('./sitemap.model');
var Crawler = require('simplecrawler');
// var influx = require('influx');
// var serverInflux = influx();
// serverInflux.getDatabaseNames(function(err, dbs) {
//   if (err) {
//     res.status(422).send(err);
//   }
//   if (dbs.indexOf(req.body.domain) === -1) {
//     serverInflux.createDatabase(req.body.domain, function(err, result) {
//       if (err) {
//         res.status(422).send(err);
//       }
//     });
//   } else {
//     var influxDb = influx({
//       // or single-host configuration
//       host: 'localhost',
//       port: 8086, // optional, default 8086
//       username: 'dieguin',
//       password: 'Amparo123$',
//       database: req.body.domain
//     });
//   }





function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Things
exports.index = function(req, res) {
  Sitemap.findAsync({})
    .then(function(domains) {
      res.status(200).json(domains);
    })
    .catch(handleError(res));
};

exports.crawl = function(req, res) {

  var urls = [];
  var crawler = new Crawler(req.body.domain);
  crawler.initialPath = req.body.initialPath || '/';
  crawler.interval = req.body.interval || 250;
  crawler.maxConcurrency = req.body.maxConcurrency || 5;
  crawler.timeout = req.body.timeout || 2000;
  crawler.userAgent = req.body.userAgent || '';
  crawler.respectRobotsTxt = req.body.respectRobotsTxt || true;
  crawler.allowInitialDomainChange = req.body.allowInitialDomainChange || false;
  crawler.filterByDomain = req.body.filterByDomain || true;
  crawler.scanSubdomains = req.body.scanSubdomains || false;
  crawler.ignoreWWWDomain = req.body.ignoreWWWDomain || true;
  crawler.stripWWWDomain = req.body.stripWWWDomain || false;
  crawler.maxResourceSize = req.body.maxResourceSize || 1000000;
  crawler.parseHTMLComments = req.body.parseHTMLComments || true;
  crawler.parseScriptTags = req.body.parseScriptTags || false;
  crawler.maxDepth = req.body.maxDepth || 0;
  crawler.ignoreInvalidSSL = req.body.ignoreInvalidSSL || true;

  crawler.queue.max("requestLatency", function(max) {
    console.log("The maximum request latency was %dms.", max);
  });
  crawler.queue.min("downloadTime", function(min) {
    console.log("The minimum download time was %dms.", min);
  });
  crawler.queue.avg("actualDataSize", function(avg) {
    console.log("The average resource size received is %d bytes.", avg);
  });

  if (req.body.fetchConditions) {
    addFetchConditions(req.body.fetchConditions);
  }

  if (req.body.addCondition) {
    addConditions(req.body.addCondition);
  }

  addCrawlEvents();
  crawler.start();

  function addConditions(condition) {
    crawler.addFetchCondition(function(parsedURL) {
      var regExp = new RegExp(condition, 'g');
      console.log(regExp);
      return parsedURL.path.match(regExp);
    });
  }

  function addFetchConditions(conditions) {
    conditions.map(function(condition) {
      crawler.addFetchCondition(function(parsedURL) {
        var regExp = new RegExp('.' + condition + '$', 'i');
        return !parsedURL.path.match(regExp);
      });
    });
  }

  function addCrawlEvents() {
    crawler.on('crawlstart', function() {
      console.log('crawlstart', arguments);
      Sitemap.findOneAsync({
        domain: req.body.domain
      }).then(function(response) {
        if (response) {
          response.removeAsync().then(function() {
            Sitemap.createAsync({
              domain: req.body.domain,
              urls: []
            }).then(function() {});
          });
        } else {
          Sitemap.createAsync({
            domain: req.body.domain,
            urls: []
          }).then(function() {});
        }
      }).catch(handleError(res));
    });
    crawler.on('queueadd', function(queueItem) {
      console.log('queueadd', queueItem.url);
      urls.push(queueItem.url);
      Sitemap.findOneAsync({
        domain: req.body.domain
      }).then(function(site) {
        site.urls.push(queueItem.url);
        site.saveAsync();
      });
    });
    // crawler.on('queueduplicate', function(URLData) {
    //   console.log('queueduplicate', arguments);
    //
    // });
    // crawler.on('queueerror', function(errorData, URLData) {
    //   console.log('queueerror', arguments);
    //
    // });
    // crawler.on('robotstxterror', function(error) {
    //   console.log('robotstxterror', arguments);
    //
    // });
    // crawler.on('fetchstart', function(queueItem, requestOptions) {
    //   console.log('fetchstart', arguments);
    //
    // });
    // crawler.on('fetchheaders', function(queueItem, responseObject) {
    //   console.log('fetchheaders', arguments);
    //
    // });
    // crawler.on('cookieerror', function(queueItem, error, setCookieHeader) {
    //   console.log('cookieerror', arguments);
    //
    // });
    // crawler.on('fetchcomplete', function(queueItem, responseBody, responseObject) {
    //   console.log('fetchcomplete', arguments);
    //
    // });
    // crawler.on('fetchdisallowed', function(parsedURL) {
    //   console.log('fetchdisallowed', arguments);
    //
    // });
    // crawler.on('fetchdataerror', function(queueItem, response) {
    //   console.log('fetchdataerror', arguments);
    //
    // });
    // crawler.on('fetchredirect', function(queueItem, parsedURL, response) {
    //   console.log('fetchredirect', arguments);
    //
    // });
    // crawler.on('fetch404', function(queueItem, response) {
    //   console.log('fetch404', arguments);
    //
    // });
    // crawler.on('fetch410', function(queueItem, response) {
    //   console.log('fetch410', arguments);
    //
    // });
    // crawler.on('fetcherror', function(queueItem, response) {
    //   console.log('fetcherror', arguments);
    //
    // });
    // crawler.on('gziperror', function(queueItem, error, resourceData) {
    //   console.log('gziperror', arguments);
    //
    // });
    // crawler.on('fetchtimeout', function(queueItem, crawlerTimeoutValue) {
    //   console.log('fetchtimeout', arguments);
    //
    // });
    // crawler.on('fetchclienterror', function(queueItem, errorData) {
    //   console.log('fetchclienterror', arguments);
    //
    // });
    // crawler.on('discoverycomplete', function(queueItem, resources) {
    //   console.log('discoverycomplete', arguments);
    // });
    crawler.on('complete', function() {
      console.log('complete', urls);
      res.status(200).send(urls)
    });
  }
};

// Gets a single Thing from the DB
exports.show = function(req, res) {
  Sitemap.findOneAsync({
      domain: req.params.domain
    })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Thing in the DB
exports.create = function(req, res) {
  Sitemap.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Thing in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Sitemap.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Thing from the DB
exports.destroy = function(req, res) {
  Sitemap.findOneAndUpdateAsync({
      domain: req.body.domain
    }, {
      $pull: {
        urls: req.body.url
      }
    })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(handleError(res));
};