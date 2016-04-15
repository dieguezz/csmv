'use strict';

class WorkspaceCrawlController {

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }
}

angular.module('csmvApp')
  .controller('WorkspaceCrawlController', WorkspaceCrawlController);