(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    restrict: 'E',
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&',
      empty: '<'
    },
    controller: NarrowItDownController,
    controllerAs: 'menu',
    bindToController: true
  };
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.searchTerm = "";
    menu.empty = "";

    menu.getMatchedMenuItems = function(searchTerm) {
      if (searchTerm == '') {
        menu.empty = "Nothing Found";
        menu.found = [];
      } else {
        menu.empty = "";

        MenuSearchService.getMatchedMenuItems(searchTerm)
        .then(function(response) {
          menu.found = response;

          if (menu.found.length == 0) {
            menu.empty = "Nothing Found";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    };

    menu.remove = function(itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    }
  }

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var foundItems = [];

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      })
      .then(function(response) {
        var completeMenu = response.data.menu_items;
        if (searchTerm.length == 0) {
          completeMenu = [];
        } else {
          foundItems = [];
          for (var i = 0; i < completeMenu.length; i++){
            if (completeMenu[i].description.toLowerCase().indexOf(searchTerm) >= 0) {
              foundItems.push(completeMenu[i]);
            }
          }
        }

        return foundItems;
      })
      .catch(function(error) {
        console.log(error);
      });
    };

    service.removeItem = function(itemIndex) {
      foundItems.splice(itemIndex, 1);
    };
  }

})();
