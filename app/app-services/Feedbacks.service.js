/**
 * Created by Anand on 12/12/2016.
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
        return service;

        function GetAllFeedbacks() {
            return $http.get('/Feedbacks').then(handleSuccess, handleError);
        }
        function SaveFeedback(data) {
            return $http.post('/Feedbacks', data).then(handleSuccess, handleError);

        }
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
