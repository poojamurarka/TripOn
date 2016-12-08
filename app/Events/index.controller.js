/**
 * Created by Anand on 12/8/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Event.IndexController', Controller);
    function Controller(UserService,EventsService,$scope) {
        var vm = this;
        vm.user = null;
        vm.saveEvent = saveEvent;
        //  vm.uploadFiles=uploadFiles;
        initController();

        function initController() {
            // get current user
            /* UserService.GetCurrent().then(function (user) {
             vm.user = user;
             });*/
        }



        function saveEvent(){
            var resObj = {};
            resObj.name =  $('#name').val();
            resObj.location=  $('#location').val();
            resObj.venue=  $('#venue').val();
            resObj.description=  $('#description').val();
            resObj.timings=  $('#timings').val();
            if(resObj.name && resObj.location && resObj.venue && resObj.description &&
                resObj.timings){
                EventsService.SaveEvent(resObj);
            }else {
                alert("Please enter all details");
            }
        }
    }


    /*app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
     $scope.uploadFiles = function(files, errFiles) {
     $scope.files = files;
     $scope.errFiles = errFiles;
     angular.forEach(files, function(file) {
     file.upload = Upload.upload({
     url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
     data: {file: file}
     });

     file.upload.then(function (response) {
     $timeout(function () {
     file.result = response.data;
     });
     }, function (response) {
     if (response.status > 0)
     $scope.errorMsg = response.status + ': ' + response.data;
     }, function (evt) {
     file.progress = Math.min(100, parseInt(100.0 *
     evt.loaded / evt.total));
     });
     });
     }
     }]);
     */
    /*    app.controller('MainController', function($scope, $upload) {

     $scope.uploadFile = function(){

     $scope.fileSelected = function(files) {
     if (files && files.length) {
     $scope.file = files[0];
     }

     $upload.upload({
     url: './public/images/',
     file: $scope.file
     })
     .success(function(data) {
     console.log(data, 'uploaded');
     });

     };
     };
     });

     */
})();
