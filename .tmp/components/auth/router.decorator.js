'use strict';

(function () {

  angular.module('csmvApp.auth').run(function ($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (!next.authenticate) {
        return;
      }

      var query = typeof next.authenticate === 'string' ? Auth.hasRole : Auth.isLoggedIn;

      query(1, 2).then(function (good) {
        if (!good) {
          event.preventDefault();
          Auth.isLoggedIn().then(function (is) {
            $state.go(is ? 'main' : 'login');
          });
        }
      });
    });
  });
})();
//# sourceMappingURL=router.decorator.js.map
