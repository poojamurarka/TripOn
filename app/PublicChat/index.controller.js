(function () {
    'use strict';

    angular
        .module('app')
        .controller('PublicChat.IndexController', Controller);
    var isVisited = false;
    var typing = false;
    function Controller(UserService,ChatService,$scope) {
        var vm = this;
        vm.showChat = false;
        vm.allChat = null;
        vm.user = null;
        vm.messageText = null;
        vm.marginBottom = -375;
        vm.sendMessage = sendMessage;
        vm.updateTyping  = updateTyping;
        vm.toggleChatVisibility = toggleChatVisibility;
        var userPushed = false;
        var lastTypingTime;
        var TYPING_TIMER_LENGTH = 400;
        var socket =  io();
        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                /* if(!isVisited) {
                 socket.emit("joinserver",{"uname" : vm.user.username});
                 isVisited = true;
                 }
                 */                socket.emit('get All Chat', {});
            });


            /*  ChatService.GetAllChat().then(function (data) {
             console.log(data)
             });*/
        }


        function toggleChatVisibility(){
            if(vm.marginBottom == 0){
                vm.marginBottom = -375;
            }else{
                vm.marginBottom = 0;
            }
        }


        function sendMessage(){
            socket.emit('chat message', {msg : $('#TripOn_CE').val(),name : vm.user.username});
            $('#TripOn_CE').val('');
            // console.log($('#TripOn_CE').val());
            socket.emit("typing", {"isTyping" : false,"username" : vm.user.username});
            typing = false;
            return false;

        }
        function updateTyping(){

            if (!typing) {
                typing = true;
                socket.emit("typing", {"isTyping" : true,"username" : vm.user.username});
            }
        }


        socket.on("isTyping", function(data) {
            console.log("hello.........");
            if (data.isTyping) {
                if(data.username != vm.user.username){
                    $('#TripOn_CL').append('<div id="TripOn_Typing" class="chat_breakword" ' +
                        'style="line-height:normal;color:black;visibility:visible;">'+data.username+
                        ' is typing...'+
                        '</div>');
                    //scrollToBottomChat();
                }
            } else {
                $('#TripOn_CL #TripOn_Typing').remove();
            }

        });

        socket.on('get All Chat', function(data){
            $('#TripOn_CL').empty();
            vm.allChat = data;
            var username = null;
            var className = "";
            $('#welcomeMsg').append('<div class="name">' +
                'Hi '+ vm.user.username +' !!. Welcome to chat</div>');
            for(var i in data){
                username = data[i].username;
                className = "self";
                if(username == vm.user.username){
                    username = 'Me';
                    className = "other";
                }
                username = username + " :";
                $('#TripOn_CL').append(' <li class='+className+'>'+
                    '<div class="msg">'+
                    '<p>'+username+'</p>'+
                '<p>'+data[i].message+'</p> </div> </li>');
            }
           // scrollToBottomChat();
        });
        socket.on('chat message', function(data){
            // insertChat(data.name,data.msg);
            var username = data.name;
            var className = "other";
            if(username == vm.user.username){
                username = 'Me';
                className = "self"
            }

            $('#TripOn_CL').append(' <li class='+className+'>'+
                '<div class="msg">'+
                '<p>'+username+'</p>'+
                '<p>'+data.msg+'</p> </div> </li>');

            scrollToBottomChat();
        });
        function scrollToBottomChat(){
            var objDiv = $("#TripOn_CL");
            objDiv[0].scrollTop = objDiv[0].scrollHeight;
        }

    }

})();
