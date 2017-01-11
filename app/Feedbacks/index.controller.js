(function () {
    'use strict';

    angular
        .module('app')
        .controller('Feedback.IndexController', Controller);
   // var isVisited = false;

    function Controller(UserService,FeedbacksService,$scope) {
        var vm = this;
        vm.user = null;
        vm.saveFeedback = saveFeedback;
        vm.createFeedbacks = createFeedbacks;
        initController();
        $('#successFeedback').css("visibility", "hidden");
        $('#successFeedback').css("display", "none");

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {

                vm.user = user;                                   //  details of the current user as to save individual feedbacks
            });
        }
        function saveFeedback(){
            var feedObj = {};
            //feedObj.username = vm.user.username;                //  taking  data from logged in user through UI
            feedObj.name =  vm.user.username;                     //  and  passing it to the Feedback service to post
            feedObj.email=  $('#email').val();                    //  //  it in database
            feedObj.phone=  $('#phone').val();
            feedObj.message=  $('#txtFeedback').val();


            if(feedObj.name && feedObj.email && feedObj.phone){
                FeedbacksService.SaveFeedback(feedObj).then(function (data) {
                    console.log(data);
                    if(data == "success"){
                        $('#successFeedback').css("visibility", "visible");
                        $('#successFeedback').css("display", "inline");
                        $('.contact').css("visibility", "hidden");
                        $('.contact').css("display", "none");
                    }else{
                        alert("Some error occured while adding Feedback!!!");
                    }
                });
            }else {
                alert("Please enter all details");
            }
        }

        function createFeedbacks(){
            $('#successFeedback').css("visibility", "hidden");
            $('#successFeedback').css("display", "none");
            $('.contact').css("visibility", "visible");
            $('.contact').css("display", "inline");
            $('#email').val('');
            $('#phone').val('');
            $('#txtFeedback').val('');

        }
    }
}());