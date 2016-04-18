'use strict';

angular.module('csmvApp', [
    'csmvApp.auth',
    'csmvApp.admin',
    'csmvApp.constants',
    'ncy-angular-breadcrumb',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTagsInput',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'validation.match',
  ])
  .config(function($urlRouterProvider, $locationProvider, tagsInputConfigProvider) {
    tagsInputConfigProvider
      .setDefaults('tagsInput', {
        placeholder: 'jpg, png, etc...',
        minLength: 2,
        addOnEnter: false
      })

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });