/**
 * Created by Anand on 12/5/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('RestaurantsService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAllRestaurants =  GetAllRestaurants;
        service.GetRestaurants =  GetRestaurants;
        service.SaveRestaurant =  SaveRestaurant;
        return service;

        function GetAllRestaurants() {
            return $http.get('/Restaurants').then(handleSuccess, handleError);
        }

        function GetRestaurants(address) {
            return $http.get('/Restaurants/'+address).then(handleSuccess, handleError);
        }
         function SaveRestaurant(data) {
             return $http.post('/Restaurants', data).then(handleSuccess, handleError);

         }



        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
