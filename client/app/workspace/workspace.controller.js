'use strict';

class WorkspaceController {

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }
}

angular.module('csmvApp')
  .controller('WorkspaceController', WorkspaceController);