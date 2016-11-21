(function () {
    'use strict';

    angular
        .module('app')
        .controller('Chat.IndexController', ChatController);

    ChatController.$inject = ['Socket'];

    function ChatController(Socket) {
        var vm = this;

        vm.messages = [];
        vm.messageText = '';
        vm.sendMessage = sendMessage;

        init();

        function init() {
            // Add an event listener to the 'chatMessage' event
            Socket.on('chatMessage', function (message) {
                vm.messages.unshift(message);
            });
        }

        // Create a controller method for sending messages
        function sendMessage() {
            // Create a new message object
            var message = {
                text: vm.messageText
            };

            // Emit a 'chatMessage' message event
            Socket.emit('chatMessage', message);

            // Clear the message text
            vm.messageText = '';
        }
    }
}());
