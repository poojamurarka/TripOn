(function () {
    'use strict';

    angular
        .module('app')
        .factory('HotelService', Service);

    function Service($http, $q) {
        var service = {};
        service.GetAllHotels = GetAllHotels;
        service.GetHotels = GetHotels;
        service.SaveHotels = SaveHotels;

        return service;

        function GetAllHotels() {
            return $http.get('/hotels').then(handleSuccess, handleError);            // service function to get all Hotels from dataabse
        }

        function GetHotels(address) {
            return $http.get('/hotels/'+address).then(handleSuccess, handleError);   // service function for custom search on Hotels
        }

        function SaveHotels(hotel) {
            return $http.post('/hotels', hotel).then(handleSuccess, handleError);   // service function to save Hotel in database
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
