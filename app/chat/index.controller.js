(function () {
    'use strict';

    angular
        .module('app')
        .controller('Chat.IndexController', ChatController);
    var isVisited = false;
    var roomName;
    var toUser;
    function ChatController(UserService) {
        var vm = this;
        vm.user = null;
        vm.privateChat = privateChat;
        vm.createRoom = createRoom;
        vm.getListOfOnlineUsers = getListOfOnlineUsers;
        vm.sendMessage = sendMessage;
        vm.closeChat = closeChat;
        vm.listOfOnlineUsers = [];
        //vm.visibility = "hidden";
        var socket =  io();
        initController();
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                console.log(isVisited);
                vm.user = user;
                socket.emit("joinserver", {"uname": vm.user.username,"isVisited" : isVisited});
                isVisited = true;
            });

        }
        function getListOfOnlineUsers(){

        }
        socket.on('getOnlinePeople', function(data){
            //$('#onlinePeople').empty();
            var lstOfOnline = data.listOfOnlinePeople;
            vm.listOfOnlineUsers = [];
            for(var i in lstOfOnline){
                if(vm.user.username != lstOfOnline[i].username) {
                    vm.listOfOnlineUsers.push(lstOfOnline[i]);
                    /*$('#onlinePeople').append('<button type="submit" id='+lstOfOnline[i].username+' ng-click="vm.createRoom('+lstOfOnline[i].username+')" >' +
                        lstOfOnline[i].username.toUpperCase() +
                        '</button>');

                    $('#onlinePeople').append('<div class="btn-minimize" ng-click="vm.createRoom()"  title="Close">hello</div>');
                    /*$('#onlinePeople').append('<div onclick="vm.createRoom('+lstOfOnline[i].username+')" >'+
                        lstOfOnline[i].username.toUpperCase() +
                    '</div>');
                    console.log(i + "   usersonline " + lstOfOnline[i].username);*/

                }
            }
        });
        function createRoom(user) {
            //vm.visibility = "visible";
            $('#TripOn1_WP').css("visibility", "visible");
            roomName = vm.user.username+":"+user;
            toUser = user;
            socket.emit('subscribe', {"roomId" : roomName ,"toUser" : toUser });
            $('#TripOn1_CL').empty();

        }
        function privateChat() {
            var message;
            var convertionId;
            socket.emit('send private message', {
                room: convertionId,
                message: message
            });
        }

        socket.on('conversation private post', function(data) {
            var username = data.fromUser;
            if(username == vm.user.username){
                username = 'Me';
            }
            $('#TripOn1_CL').append('<div class="chat_breakword" style="clear:left;line-height:normal;color:black;">' +
                '<span style="color:#000000;font-weight:bold;"> '+ username
                +' : </span>'+ data.message +' </div>'
                +'<div style="height:7px;"></div>');
            scrollToBottomChat();
        });
        socket.on('userOffline', function(data) {
            console.log(data.message);
            $('#TripOn1_CL').append('<div class="chat_breakword" style="clear:left;line-height:normal;color:black;">' +
                '<span style="color:#000000;font-weight:normal;"> User '+ data.toUser
                +'</span> is offline.. Try to message him/her after sometime..</div>'
                +'<div style="height:7px;"></div>');
        });
        socket.on('join room to chat', function(data) {
            roomName = data.roomName;
            //vm.visibility = "visible";
            $('#TripOn1_WP').css("visibility", "visible");
            $('#TripOn1_CL').empty();
            socket.emit('add me in room',data);
        });


        function sendMessage(){
            socket.emit('send private message', {"toUser" : toUser,"room" : roomName,"message" : $('#TripOn1_CE').val(),"name" : vm.user.username});
            $('#TripOn1_CE').val('');

        }

        function closeChat(){
            //vm.visibility = "hidden";
            $('#TripOn1_WP').css("visibility", "hidden");
        }
        function scrollToBottomChat(){
            var objDiv = $("#TripOn1_CL");
            objDiv[0].scrollTop = objDiv[0].scrollHeight;
        }
    }
}());
