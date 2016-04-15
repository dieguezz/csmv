'use strict';

angular.module('csmvApp')
  .directive('crawler', () => ({
    templateUrl: 'components/crawler/crawler.html',
    restrict: 'E',
    controller: 'CrawlerController',
    controllerAs: 'crawler'
  }));