'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var SitemapSchema = new Schema({
  domain: String,
  urls: []
});

module.exports = mongoose.model('Sitemap', SitemapSchema);