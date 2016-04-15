'use strict';

angular.module('csmvApp').config(function ($stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'app/main/main.html',
    controller: 'MainController',
    controllerAs: 'main'
  });
});
//# sourceMappingURL=main.js.map
