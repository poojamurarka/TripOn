(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);
    function Controller(UserService,HotelService,EventsService,RestaurantsService,$scope) {
        var vm = this;
        vm.user = null;
        vm.getData = getData;
        vm.listOfHotels = [];
        vm.listOfRestaurants = [];
        vm.listOfEvents = [];
        var socket =  io();
        initController();
        $('#noRes').css("visibility", "hidden");
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
            var address = "24114";
            if(address!="" && address != undefined) {
                getAllData(address);
            }
        }

        function getData(){
            var address = $('#placename').val();
            if(address!="" && address != undefined) {
                getAllData(address);
            }
        }

        function getAllData(address){
            $('#noRes').css("visibility", "visible");
            HotelService.GetHotels(address).then(function (data) {
                if(data && data.length > 0){
                    $('#noRes').css("visibility", "hidden");
                    vm.listOfHotels = data;
                    $('.Hotels').css("visibility", "visible");
                }else{
                    vm.listOfHotels = [];
                    $('.Hotels').css("visibility", "hidden");
                }
                console.log(vm.listOfHotels);
            });
            RestaurantsService.GetRestaurants(address).then(function (data) {
                console.log(vm.listOfRestaurants);
                if(data && data.length > 0){
                    $('#noRes').css("visibility", "hidden");
                    vm.listOfRestaurants = data;
                    $('.restaurants').css("visibility", "visible");
                }else{
                    vm.listOfRestaurants = [];
                    $('.restaurants').css("visibility", "hidden");
                }
            });
            EventsService.GetEvents(address).then(function (data) {
                if(data && data.length > 0){
                    $('#noRes').css("visibility", "hidden");
                    vm.listOfEvents = data;
                    $('.events').css("visibility", "visible");
                }else{
                    vm.listOfEvents = [];
                    $('.events').css("visibility", "hidden");
                }
            });
        }

    }

})();
