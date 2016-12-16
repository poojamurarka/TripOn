(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);
    function Controller(UserService,HotelService,EventsService,RestaurantsService,$scope,$rootScope) {
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
                $rootScope.isAdmin = false;
                if(user.isAdmin == "true"){
                    $rootScope.isAdmin = true;
                }
                console.log(user);
            });
            var address = "24114";
            //alert(address);
            getCurrentLOcation();

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
                    for(var j=0; j<data.length ; j++){
                        if(data[j].Description && data[j].Description.length > 19) {
                            data[j].Description = data[j].Description.substring(0, 20) + "...";
                        }
                    }
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
                    for(var k=0; k<data.length ; k++){
                        if(data[k].Description && data[k].Description.length > 19) {
                            data[k].Description = data[k].Description.substring(0, 20) + "...";
                        }
                    }
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
                    for(var l=0; l<data.length ; l++){
                        if(data[l].Description && data[l].Description.length > 19) {
                            data[l].Description = data[l].Description.substring(0, 20) + "...";
                        }
                    }
                    vm.listOfEvents = data;
                    $('.events').css("visibility", "visible");
                }else{
                    vm.listOfEvents = [];
                    $('.events').css("visibility", "hidden");
                }
            });
        }

        function getCurrentLOcation(){
            $(document).ready(function() {
                $.get("http://ipinfo.io", function (response) {
                    var address = "";
                    if(response.region){
                        address = response.region;
                    }
                    if(response.postal){
                        address = address +','+ response.postal;
                    }
                    $("#placename").val(address);
                   // return response.postal;
                    var address = response.region +" "+response.postal;
                    console.log(address);
                    if(response.postal!="" && response.postal != undefined) {
                        getAllData(response.postal);
                    }
                }, "jsonp")

            });
        }

    }

})();