/**
 * Created by jyoti on 13/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Hotels.IndexController', Controller);
    function Controller(UserService,HotelsService,$scope) {
        var vm = this;
        vm.user = null;
        vm.saveHotels = saveHotels;
        vm.createHotels = createHotels;
        //  vm.uploadFiles=uploadFiles;
        initController();
        $('#successHotels').css("visibility", "hidden");
        function initController() {
            // get current user
            /* UserService.GetCurrent().then(function (user) {
             vm.user = user;
             });*/
        }



        function saveHotels(){
            var resObj = {};
            resObj.name =  $('#name').val();
            resObj.location=  $('#location').val();
            resObj.address =  $('#address').val();
            resObj.description=  $('#description').val();
            resObj.rating=  $('#rating').val();
            resObj.pricePerDay=  $('#pricePerDay').val();

            if(resObj.name && resObj.location && resObj.address && resObj.description && resObj.rating &&
                resObj.pricePerDay ){
                HotelsService.SaveHotels(resObj).then(function (data) {
                    console.log(data);
                    if(data == "success"){
                        $('#successHotels').css("visibility", "visible");
                        $('#addHotels').css("visibility", "hidden");
                    }else{
                        alert("Some error occured while adding Hotels!!!");
                    }
                });
            }else {
                alert("Please enter all details");
            }
        }
        function createHotels(){
            $('#successHotels').css("visibility", "hidden");
            $('#addHotels').css("visibility", "visible");
            $('#name').val('');
            $('#location').val('');
            $('#address').val('');
            $('#description').val('');
            $('#rating').val('');
            $('#pricePerDay').val('');
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
