(function () {
    'use strict';

    angular
        .module('app')
        .controller('Logout.IndexController', Controller);

    function Controller(UserService,ChatService,$scope) {
        var socket =  io();
        initController();

        function initController() {
            console.log("logout");
            socket.emit('disconnect');
        }
    }

})();