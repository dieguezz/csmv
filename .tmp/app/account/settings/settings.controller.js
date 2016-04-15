'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SettingsController = (function () {
  //end-non-standard

  function SettingsController(Auth) {
    _classCallCheck(this, SettingsController);

    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
  }

  _createClass(SettingsController, [{
    key: 'changePassword',
    value: function changePassword(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.changePassword(this.user.oldPassword, this.user.newPassword).then(function () {
          _this.message = 'Password successfully changed.';
        })['catch'](function () {
          form.password.$setValidity('mongoose', false);
          _this.errors.other = 'Incorrect password';
          _this.message = '';
        });
      }
    }
  }]);

  return SettingsController;
})();

angular.module('csmvApp').controller('SettingsController', SettingsController);

//start-non-standard
//# sourceMappingURL=settings.controller.js.map
