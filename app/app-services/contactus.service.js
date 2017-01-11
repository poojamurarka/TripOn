
(function () {
    'use strict';

    angular
        .module('app')
        .factory('CustomerQueryService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAllCustomerQuery =  GetAllCustomerQuery;
        return service;

        function GetAllCustomerQuery() {
            return $http.get('/getQueries').then(handleSuccess, handleError);       // service function to retrieve all customer quieries
        }
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
