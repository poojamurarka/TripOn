(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");
                                                        //  different template URL so as to identify the controller with a particular url.
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
            .state('PublicChat', {
                url: '/PublicChat',
                templateUrl: 'PublicChat/index.html',
                controller: 'PublicChat.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'PublicChat' }
            })
			.state('hotels', {
                url: '/hotels',
                templateUrl: 'hotels/index.html',
                controller: 'hotelcont',
                controllerAs: 'vm',
                data: { activeTab: 'hotels' }
            })
			.state('Restaurants', {
                url: '/Restaurants',
                templateUrl: 'Restaurants/index.html',
                controller: 'Restaurant.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'Restaurants' }
            })
            .state('Events', {
                url: '/Events',
                templateUrl: 'Events/index.html',
                controller: 'Event.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'Events' }
            })
            .state('chat', {
                url: '/chat',
                templateUrl: 'chat/index.html',
                controller: 'Chat.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'chat' }
            })
			.state('Feedbacks', {
                url: '/Feedbacks',
                templateUrl: 'Feedbacks/index.html',
                controller: 'Feedback.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'Feedbacks' }
            })
            .state('viewFeedbacks', {
                url: '/viewFeedbacks',
                templateUrl: 'viewFeedbacks/index.html',
                controller: 'ViewFeedback.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'viewFeedbacks' }
            })
	    .state('viewQueries', {
		url: '/viewQueries',    
		templateUrl: 'viewQueries/index.html',
                controller: 'ViewQueries.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'viewQueries' }
            })
            .state('logout', {
                controller: 'Logout.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            });
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();