/**
 * Sitemap model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Sitemap = require('./sitemap.model');
var SitemapEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SitemapEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'update': 'update',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Sitemap.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  console.log('EMIT EVENT')
  return function(doc) {
    SitemapEvents.emit(event + ':' + doc._id, doc);
    SitemapEvents.emit(event, doc);
  }
}

module.exports = SitemapEvents;