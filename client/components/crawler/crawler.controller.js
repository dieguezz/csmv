'use strict';

class CrawlerController {

  constructor($http, socket) {
    this.advancedOptions = false;
    this.$http = $http;
    this.socket = socket;
    this.form = {};
    this.results = {};
    this.results.isLoading = false;
    this.form.fetchConditions = [{
      text: 'jpg'
    }, {
      text: 'png'
    }, {
      text: 'css'
    }, {
      text: 'js'
    }, {
      text: 'doc'
    }, {
      text: 'csv'
    }, {
      text: 'bmp'
    }];
    this.sitemap = [];
  }

  crawlDomain(form) {
    this.advancedOptions = false;
    this.results.isLoading = true;
    this.sitemap = [];
    var self = this;
    if (form.fetchConditions) {
      form.fetchConditions = self.tagsToArr();
    }
    self.socket.syncUpdates('sitemap', self.sitemap);
    this.$http.post('api/sitemaps', form).then(function(response) {
      self.results(response.data.length);
      self.sitemap[0] = response.data;
      self.results.isLoading = false;
    }, function(err) {
      self.results.isLoading = false;
      throw err;
    });
  }

  results.prototype.isEmpty = function(length) {
    return length > 0;
  };

  removeUrl(url) {
    var self = this;
    this.$http.post('/api/sitemaps/deleteUrl', {
      domain: self.form.domain,
      url: url
    }).then(function() {
      var index = self.sitemap.indexOf[url];
      self.sitemap.splice(index, 1);
    });
  }

  tagsToArr() {
    return this.form.fetchConditions.map(function(tag) {
      return tag.text;
    });
  }
}

angular.module('csmvApp')
  .controller('CrawlerController', CrawlerController);