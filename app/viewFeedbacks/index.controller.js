(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewFeedback.IndexController', Controller);
   // var isVisited = false;

    function Controller(FeedbacksService,$scope) {
        var vm = this;
        vm.user = null;
        vm.listFeedbacks = [];
        vm.deleteFeedback = deleteFeedback;
        initController();
        $('#successFeedback').css("visibility", "hidden");
        function initController() {
            // get current user
            FeedbacksService.GetAllFeedbacks().then(function (listOfFeedback) {
                console.log(listOfFeedback);
                vm.listFeedbacks = listOfFeedback;
                if(vm.listFeedbacks && vm.listFeedbacks.length > 0){
                    $('.feedbacks').css("visibility", "visible");
                }else {
                    $('.feedbacks').css("visibility", "hidden");
                }
            });
        }

        function deleteFeedback(){
           // var id = "1";
            //alert($(this).("id"));
            //alert(id);
            var id =  $('#_id').text();
            FeedbacksService.DeleteFeedback(id).then(function (data) {
                if(data == "success"){
                    var index = -1;
                    var comArr = eval( vm.listFeedbacks );
                    console.log(id);
                    for( var i = 0; i < comArr.length; i++ ) {
                        if( comArr[i].id === id ) {
                            index = i;
                            break;
                        }
                    }
                    vm.listFeedbacks.splice( index, 1 );
                    if(vm.listFeedbacks && vm.listFeedbacks.length > 0){
                        $('.feedbacks').css("visibility", "visible");
                    }else {
                        $('.feedbacks').css("visibility", "hidden");
                    }
                    //$location.path("/viewFeedbacks");
                }else{
                     alert("Query couldn't be Deleted or doesn't exist");
                }
            });
        }

    }
}());