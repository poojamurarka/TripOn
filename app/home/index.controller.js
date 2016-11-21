(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService,ChatService) {
        var vm = this;
        vm.allChat = null;
        vm.user = null;
        vm.messageText = null;
        vm.sendMessage = sendMessage;
        var socket =  io();
        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                socket.emit('get All Chat', {});
            });


          /*  ChatService.GetAllChat().then(function (data) {
                console.log(data)
            });*/
        }


        function sendMessage(){
                socket.emit('chat message', {msg : $('#TripOn_CE').val(),name : vm.user.username});
                $('#TripOn_CE').val('');
                console.log($('#TripOn_CE').val());
                return false;

        }
        socket.on('get All Chat', function(data){
           // $('#TripOn_CL').html('');
            vm.allChat = data;
            var username = null;
            console.log(data);
            for(var i in data){
                username = data[i].username;
                console.log(vm.user)
                if(username == vm.user.username){
                    username = 'Me';
                }
                $('#TripOn_CL').append('<div class="chat_breakword" style="clear:left;line-height:normal;color:black;">' +
                    '<span style="color:#000000;font-weight:bold;">' + username
                    +' : </span>'+ data[i].message+' </div>'
                    +'<div style="height:7px;"></div>');
            }
        });
        socket.on('chat message', function(data){
           // insertChat(data.name,data.msg);
            var username = data.name;
            if(username == vm.user.username){
                username = 'Me';
            }
            $('#TripOn_CL').append('<div class="chat_breakword" style="clear:left;line-height:normal;color:black;">' +
                '<span style="color:#000000;font-weight:bold;">' + username
                +' : </span>'+ data.msg+' </div>'
            +'<div style="height:7px;"></div>');
        });
    }

})();