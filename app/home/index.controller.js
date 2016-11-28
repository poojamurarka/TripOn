(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);
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
                        '<img src="https://www.snapengage.com/img/typing.gif" alt="[...]" width="24" height="8">'+
                    '</div>');
                }
            } else {
                $('#TripOn_CL #TripOn_Typing').remove();
            }

        });

        socket.on('get All Chat', function(data){
            $('#TripOn_CL').empty();
            vm.allChat = data;
            var username = null;
            $('#TripOn_CL').append(' <div style="height:7px;"></div>'+
                '<div class="chat_breakword" style="line-height:normal;color:black;">' +
                'Hi'+ vm.user.username +'!!.<br></div>');
            for(var i in data){
                username = data[i].username;
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
/*        socket.on('getOnlinePeople', function(data){
            var lstOfOnline = data.listOfOnlinePeople;
            for(var i in lstOfOnline){
                if(vm.user.username != lstOfOnline[i].username) {
                    console.log(i + "   usersonline " + lstOfOnline[i].username);
                }
            }
        });*/

    }

})();
