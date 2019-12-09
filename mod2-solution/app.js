(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.toBuyArray = ShoppingListCheckOffService.toBuy();

  toBuy.remove = function(index) {
    ShoppingListCheckOffService.remove(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;
  alreadyBought.boughtArray = ShoppingListCheckOffService.getItems();
}

function ShoppingListCheckOffService() {
  var service = this;
  var boughtArray = [];

  var toBuyArray = [
    { name: "Cookies", quantity: "10" },
    { name: "Soda", quantity: "3" },
    { name: "Ice Cream", quantity: "5" },
    { name: "Pizza", quantity: "5" },
    { name: "Cake", quantity: "2" }
  ];

  service.toBuy = function() {
    return toBuyArray;
  };

  service.remove = function(index) {
    var item = toBuyArray[index];
    boughtArray.push(item);
    toBuyArray.splice(index, 1);
    //console.log(boughtArray);
  };

  service.getItems = function() {
    return boughtArray;
  };
}

})();
