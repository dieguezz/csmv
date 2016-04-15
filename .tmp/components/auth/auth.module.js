'use strict';

angular.module('csmvApp.auth', ['csmvApp.constants', 'csmvApp.util', 'ngCookies', 'ui.router']).config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
//# sourceMappingURL=auth.module.js.map
