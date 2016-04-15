'use strict';

angular.module('csmvApp', [
    'csmvApp.auth',
    'csmvApp.admin',
    'csmvApp.constants',
    'ncy-angular-breadcrumb',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'validation.match',
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });