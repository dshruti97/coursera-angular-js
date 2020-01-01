(function () {
  'use strict';

  angular.module('public')
  .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MenuService', 'MyInfoService'];
  function SignUpController(MenuService, MyInfoService) {
    var $ctrl = this;
    $ctrl.info = {};

    $ctrl.submit = function() {
      MenuService.getMenuItem($ctrl.info.favourite)
      .then(function (response) {
        $ctrl.invalidFavourite = false;
        $ctrl.submitted = true;
        MyInfoService.setInfo($ctrl.info);
      })
      .catch(function() {
        $ctrl.invalidFavourite = true;
      })
    };
  }
})();
