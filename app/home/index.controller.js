(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);
    function Controller(UserService,HotelService,EventsService,RestaurantsService,$scope) {
        var vm = this;
        vm.user = null;
        vm.listOfHotels = [];
        vm.listOfRestaurants = [];
        vm.listOfEvents = [];
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
            RestaurantsService.GetRestaurants(address).then(function (data) {
                vm.listOfRestaurants = data;
                console.log(vm.listOfRestaurants);
            });
            EventsService.GetEvents(address).then(function (data) {
                vm.listOfEvents = data;
                console.log(vm.listOfEvents);
            });

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
