(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);
    function Controller(UserService,HotelService,$scope) {
        var vm = this;
        vm.user = null;
        //vm.takePlaceName = takePlaceName;
        var socket =  io();
        initController();
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
            HotelService.GetHotels().then(function (data) {
                console.log(data)
            });
            /*HotelService.CreateHotel([]).then(function (data) {
                console.log(data)
            });*/

        }

       /* function takePlaceName(){
            //console.log($('#placename').val());
            //socket.emit("Get Data",$('#placename').val());
			socket.emit("Get Data",{});
        }

        socket.on('Send Database Information', function(data) {
            console.log(data);
        });*/



    }

})();
