/**
 * Created by Anand on 12/8/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Hotel.IndexController', Controller);
    function Controller(UserService,HotelService,$scope) {
        var vm = this;
        vm.user = null;
        vm.saveHotel = saveHotel;
        vm.createHotel = createHotel;
        //  vm.uploadFiles=uploadFiles;
        initController();
        $('#successHotel').css("visibility", "hidden");
        function initController() {
            // get current user
            /* UserService.GetCurrent().then(function (user) {
             vm.user = user;
             });*/
        }



        function saveHotel(){
            var resObj = {};
            resObj.Name =  $('#name1').val();
            resObj.Location=  $('#location1').val();
            resObj.Address=  $('#address1').val();
            resObj.Description=  $('#description1').val();
            resObj.Rating=  $('#rating1').val();
            resObj.pricePerDay=  $('#pricePerDay1').val();
            if(resObj.Name && resObj.Location && resObj.Address && resObj.Description &&
                resObj.Rating && resObj.pricePerDay){
                HotelService.SaveHotel(resObj).then(function (data) {
                    console.log(data);
                    if(data == "success"){
                        $('#successHotel').css("visibility", "visible");
                        $('#addHotel').css("visibility", "hidden");
                    }else{
                        alert("Some error occured while adding Events!!!");
                    }
                });
            }else {
                alert("Please enter all details");
            }
        }
        function createHotel(){
            $('#successHotel').css("visibility", "hidden");
            $('#addHotel').css("visibility", "visible");
            $('#name1').val('');
            $('#location1').val('');
            $('#address1').val('');
            $('#description1').val('');
            $('#rating1').val('');
            $('#pricePerDay1').val('');
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
