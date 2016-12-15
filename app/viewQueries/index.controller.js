(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewQueries.IndexController', Controller);
   // var isVisited = false;

    function Controller(CustomerQueryService,$scope) {
        var vm = this;
        vm.user = null;
        vm.listOfQueries = [];
        initController();
        function initController() {
            // get current user
            CustomerQueryService.GetAllCustomerQuery().then(function (listOfQueries) {
                console.log(listOfQueries);
                vm.listOfQueries = listOfQueries;
                $('.query').css("visibility", "visible");

            });
        }

    }
}());