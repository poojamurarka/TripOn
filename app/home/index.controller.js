(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);
    function Controller(UserService,HotelService,$scope) {
        var vm = this;
        vm.user = null;
        vm.listOfHotels = [];
        var socket =  io();
        initController();
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
            var address = "24114";
            HotelService.GetHotels(address).then(function (data) {
                vm.listOfHotels = data;
                console.log(vm.listOfHotels);
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
