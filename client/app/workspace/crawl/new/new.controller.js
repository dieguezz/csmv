'use strict';

class WorkspaceCrawlNewController {

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }
}

angular.module('csmvApp')
  .controller('WorkspaceCrawlNewController', WorkspaceCrawlNewController);