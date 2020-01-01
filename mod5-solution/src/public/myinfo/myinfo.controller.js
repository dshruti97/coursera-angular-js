(function () {
  'use strict';

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['MenuService', 'info'];
  function MyInfoController(MenuService, info) {
    var $ctrl = this;

    if (info) {
      $ctrl.info = info;
      MenuService.getMenuItem(info.favourite)
      .then(function(response) {
        $ctrl.menuItem = response;
      })
      .catch(function(error) {
        console.log(error);
      })
    }
  }
})();
