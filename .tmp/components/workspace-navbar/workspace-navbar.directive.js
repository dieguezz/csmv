'use strict';

angular.module('csmvApp').directive('workspacenavbar', function () {
  return {
    templateUrl: 'components/workspace-navbar/workspace-navbar.html',
    restrict: 'E',
    transclude: true,
    scope: {
      navOptions: '='
    },
    link: function link(scope, element) {
      console.log(scope, element);
    }
  };
});
//# sourceMappingURL=workspace-navbar.directive.js.map
