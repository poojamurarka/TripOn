/**
 * Created by jyoti on 12/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('FeedbacksService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAllFeedbacks =  GetAllFeedbacks;
        service.SaveFeedback =  SaveFeedback;
		service.DeleteFeedback = DeleteFeedback;
        return service;

        function GetAllFeedbacks() {
            return $http.get('/viewFeedbacks').then(handleSuccess, handleError);
        }
        function SaveFeedback(data) {
            return $http.post('/Feedbacks', data).then(handleSuccess, handleError);

        }
		function DeleteFeedback(id) {
            return $http.post('/viewFeedbacks/'+id).then(handleSuccess, handleError);
        }
		
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
