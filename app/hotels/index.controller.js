/**
 * Created by emsu on 12/14/2016.
 */
(function () {
    'use strict';
    angular
        .module('app')
        .controller('hotelcont',Controller);
    function Controller(HotelService,$scope) {
        var vm = this;
        vm.user = null;
        vm.saveHotels = saveHotels;
        vm.createHotels = createHotels;
        initController();
        $('#successHot').css("visibility", "hidden");
        function initController() {
            //get current user
            /* UserService.GetCurrent().then(function (user) {
             vm.user = user;
             });*/
        }

        /* function uploadFiles(files, errFiles) {
         vm.files = files;
         vm.errFiles = errFiles;
         angular.forEach(files, function(file)) {
         file.upload = Upload.upload({
         url:'https://angular-file-upload-cors-srv.appspot.com/upload',
         data:{file:file}
         });
         file.upload.then(function (response) {
         $timeout(function () {
         file.result = response.data;
         });
         }, function (response) {
         if (response.status >0)
         vm.errorMsg = response.status + ':' + response.data;
         }, function (evt) {
         file.progress = Math.min(100, parseInt(100.0* evt.loaded /evt.total));
         });
         });
         }
      */
         function saveHotels() {
             var resObj = {};
             resObj.name = $('#name').val();
             resObj.location = $('#location').val();
             resObj.address = $('#address').val();
             resObj.description = $('#description').val();
             resObj.rating = $('#rating').val();
             resObj.price = $('#price').val();
             if (resObj.name && resObj.location && resObj.address && resObj.description && resObj.rating && resObj.price) {
                 HotelService.SaveHotels(resObj).then(function (data) {
                     console.log(data);
                     if (data == "success") {
                         $('#successHot').css("visibility", "visible");
                         $('#addHotels').css("visibility", "hidden");
                     }
                     else {
                         alert("There are errors while adding Hotels!!");
                     }
                 });
             }
             else
                 {
                     alert("please enter all details");
                 }
             }

             function createHotels() {
                 $('#successHotels').css("visibility", "hidden");
                 $('#addHotels').css("visibility", "visible");
                 $('#name').val('');
                 $('#location').val('');
                 $('#address').val('');
                 $('#description').val('');
                 $('#rating').val('');
                 $('#price').val('');
             }
         }


    }) ();



















