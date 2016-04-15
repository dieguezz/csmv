'use strict';

angular.module('csmvApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('workspace', {
        url: '/workspace',
        templateUrl: 'app/workspace/workspace.html',
        controller: 'WorkspaceController',
        controllerAs: 'workspace',
        authenticate: true,
        ncyBreadcrumb: {
          skip: true
        }
      })
      .state('workspace.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/workspace/dashboard/dashboard.html',
        controller: 'WorkspaceDashboardController',
        controllerAs: 'dashboard',
        authenticate: true
      })
      .state('workspace.scrape', {
        url: '/scrape',
        templateUrl: 'app/workspace/scrape/scrape.html',
        controller: 'WorkspaceScrapeController',
        controllerAs: 'scrape',
        authenticate: true
      })
      .state('workspace.crawl', {
        url: '/crawl',
        templateUrl: 'app/workspace/crawl/crawl.html',
        controller: 'WorkspaceCrawlController',
        controllerAs: 'crawl',
        authenticate: true,
        ncyBreadcrumb: {
          label: 'Crawl'
        }
      })
      .state('workspace.crawl.new', {
        url: '/new',
        templateUrl: 'app/workspace/crawl/new/new.html',
        controller: 'WorkspaceCrawlNewController',
        controllerAs: 'crawl',
        authenticate: true,
        ncyBreadcrumb: {
          label: 'Crawl New Domain'
        }
      });
  });