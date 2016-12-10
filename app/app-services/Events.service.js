/**
 * Created by Anand on 12/8/2016.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .factory('EventsService', Service);

    function Service($http, $q) {
        var service = {};
        service.GetAllEvents =  GetAllEvents;
        service.GetEvents =  GetEvents;
        service.SaveEvent =  SaveEvent;
        return service;

        function GetAllEvents() {
            return $http.get('/Events').then(handleSuccess, handleError);
        }

        function GetEvents(address) {
            return $http.get('/Events/'+address).then(handleSuccess, handleError);
        }

        function SaveEvent(data) {
            return $http.post('/Events', data).then(handleSuccess, handleError);

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
