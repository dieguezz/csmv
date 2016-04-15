'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var WorkspaceController = function WorkspaceController(Auth, $state) {
  _classCallCheck(this, WorkspaceController);

  this.Auth = Auth;
  this.$state = $state;
};

angular.module('csmvApp').controller('WorkspaceController', WorkspaceController);
//# sourceMappingURL=workspace.controller.js.map
