'use strict';

angular.module('csmvApp').directive('workspacesidebar', function () {
  return {
    templateUrl: 'components/workspace-sidebar/workspace-sidebar.html',
    restrict: 'E',
    transclude: true,
    link: function link(scope, element) {
      console.log(scope, element);
    }
  };
});
//# sourceMappingURL=workspace-sidebar.directive.js.map
