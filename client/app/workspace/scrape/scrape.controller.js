'use strict';

class WorkspaceScrapeController {

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }
}

angular.module('csmvApp')
  .controller('WorkspaceScrapeController', WorkspaceScrapeController);