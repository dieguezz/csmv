'use strict';

class WorkspaceCrawlController {

  constructor($http) {
    this.$http = $http;
    this.sitemaps = [];
    this.sitemap = [];
    this.isLoading = false;

    $http.get('/api/sitemaps').then(response => {
      this.sitemaps = response.data;
    });
  }

  removeUrl(url) {
    var self = this;
    this.$http.post('/api/sitemaps/deleteUrl', {
      domain: self.sitemap.domain,
      url: url
    }).then(function() {
      var index = self.sitemap.urls.indexOf[url];
      self.sitemap.urls.splice(index, 1);
    });
  }
}

angular.module('csmvApp')
  .controller('WorkspaceCrawlController', WorkspaceCrawlController);