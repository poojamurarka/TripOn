/**
 * Created by Anand on 12/12/2016.
 */
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
            return $http.get('/getQueries').then(handleSuccess, handleError);
        }
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
