(function () {
    'use strict';

    angular
        .module('app')
        .factory('ChatService', Service);

    function Service($http, $q) {
        var service = {};

        service.SaveChat = SaveChat;
        service.GetAllChat = GetAllChat;

        return service;

        function GetAllChat() {
            return $http.get('/api/chat/getAllChat').then(handleSuccess, handleError);
        }

        function SaveChat(data) {
            return $http.post('/api/chat/saveChat', data).then(handleSuccess, handleError);
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
