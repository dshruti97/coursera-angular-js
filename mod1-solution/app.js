(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.items = "";
  $scope.message = "";
  $scope.color = "";

  $scope.CheckLunch = function () {
    if ($scope.items.length == 0) {
      $scope.message = "Please enter data first";
      $scope.color = "red";
    } else {
      var items = $scope.items.split(',');
      for (var i = 0; i < items.length; i++) {
        if (items[i] == "") {
          items.splice(i, 1); //removing empty items
        }
      }

      if (items.length <= 3) {
        $scope.message = "Enjoy!";
        $scope.color = "green";
      } else {
        $scope.message = "Too much!";
        $scope.color = "green";
      }
    }
  };
}

})();
