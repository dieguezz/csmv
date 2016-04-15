'use strict';

class WorkspaceDashboardController {

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }
}

angular.module('csmvApp')
  .controller('WorkspaceDashboardController', WorkspaceDashboardController);