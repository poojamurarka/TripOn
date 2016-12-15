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
        initController();
        $('#successFeedback').css("visibility", "hidden");
        function initController() {
            // get current user
            FeedbacksService.GetAllFeedbacks().then(function (listOfFeedback) {
                console.log(listOfFeedback);
                vm.listFeedbacks = listOfFeedback;
                $('.feedbacks').css("visibility", "visible");

            });
        }

    }
}());