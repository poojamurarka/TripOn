(function () {
    'use strict';

    angular
        .module('app')
        .controller('Restaurant.IndexController', Controller);
    function Controller(UserService,RestaurantsService,$scope) {
        var vm = this;
        vm.user = null;
        vm.saveRestaurant = saveRestaurant;
        //vm.uploadFiles=uploadFiles;
        //vm.files;
        //vm.errFiles;
        initController();

        function initController() {
            // get current user
           /* UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });*/
        }

       /* function uploadFiles(files, errFiles) {
            vm.files = files;
            vm.errFiles = errFiles;
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
                        vm.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            });
        }
*/
        function saveRestaurant(){
            var resObj = {};
            resObj.name =  $('#name').val();
            resObj.location=  $('#location').val();
            resObj.address=  $('#description').val();
            resObj.description=  $('#address').val();
            resObj.timings=  $('#timings').val();
            resObj.contact=  $('#contact').val();
            if(resObj.name && resObj.location && resObj.address && resObj.description &&
                resObj.timings && resObj.contact){
                RestaurantsService.SaveRestaurant(resObj);
            }else {
                alert("Please enter all details");
            }
        }
    }

/*var MyCtrl= function ($scope, Upload, $timeout) {
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
};*/
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
