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

        //service.SaveChat = SaveChat;
        service.SaveEvent =  SaveEvent;
        return service;


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
