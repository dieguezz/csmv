'use strict';

angular.module('csmvApp')
  .directive('workspacesidebar', function() {
    return {
      templateUrl: 'components/workspace-sidebar/workspace-sidebar.html',
      restrict: 'E',
      transclude: true,
      link: function(scope, element) {
        console.log(scope, element);
      }
    };
  });