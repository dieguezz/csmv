'use strict';

angular.module('csmvApp').controller('OauthButtonsCtrl', function ($window) {
  this.loginOauth = function (provider) {
    $window.location.href = '/auth/' + provider;
  };
});
//# sourceMappingURL=oauth-buttons.controller.js.map
