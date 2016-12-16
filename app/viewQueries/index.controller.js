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
        vm.deleteQuery = deleteQuery;
        initController();
        function initController() {
            // get current user
            CustomerQueryService.GetAllCustomerQuery().then(function (listOfQueries) {
                console.log(listOfQueries);
                vm.listOfQueries = listOfQueries;
                if(vm.listOfQueries && vm.listOfQueries.length > 0){
                    $('.query').css("visibility", "visible");
                }else {
                    $('.query').css("visibility", "hidden");
                }

            });
        }

        function deleteQuery(){
            // var id = "1";
            //alert($(this).("id"));
            //alert(id);
            var id =  $('#_id').text();
            CustomerQueryService.DeleteQuery(id).then(function (data) {
                if(data == "success"){
                    var index = -1;
                    var comArr = eval( vm.listOfQueries );
                    console.log(id);
                    for( var i = 0; i < comArr.length; i++ ) {
                        if( comArr[i].id === id ) {
                            index = i;
                            break;
                        }
                    }
                    vm.listOfQueries.splice( index, 1 );
                    if(vm.listOfQueries && vm.listOfQueries.length > 0){
                        $('.query').css("visibility", "visible");
                    }else {
                        $('.query').css("visibility", "hidden");
                    }
                    //$location.path("/viewFeedbacks");
                }else{
                    alert("Query couldn't be Deleted or doesn't exist");
                }
            });
        }

    }
}());