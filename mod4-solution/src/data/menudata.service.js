(function() {
  'use strict';

  angular.module('Data')
  .service('MenuDataService', MenuDataService)
  .constant('APIBasePath', 'https://davids-restaurant.herokuapp.com/');

  MenuDataService.$inject = ['APIBasePath', '$http'];
  function MenuDataService(APIBasePath, $http) {
      var service = this;

      service.getAllCategories = function() {
        var response = $http({
          method: "GET",
          url: (APIBasePath + "categories.json")
        });

        return response;
      };

      service.getItemsForCategory = function(categoryShortName) {
        var response = $http({
          method: "GET",
          url: (APIBasePath + "menu_items.json"),
          params: {category: categoryShortName}
        });

        return response;
      };
  }

})();
