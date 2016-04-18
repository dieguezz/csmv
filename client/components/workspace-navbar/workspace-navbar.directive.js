'use strict';

angular.module('csmvApp')
  .directive('workspacenavbar', function() {
    return {
      templateUrl: 'components/workspace-navbar/workspace-navbar.html',
      restrict: 'E',
      transclude: true,
      scope: {
        navOptions: '='
      },
      link: function(scope, element) {}
    };
  });