(function () {
    'use strict';

    angular
        .module('app')
        .factory('HotelService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetHotels = GetHotels;
        service.CreateHotel = CreateHotel;

        return service;

        function GetHotels() {
            return $http.get('/hotels').then(handleSuccess, handleError);
        }

        function CreateHotel(hotel) {
            return $http.post('/hotels', hotel).then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
