angular.module('session.module')

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    
	.state('session', {
        // should be abstract and contain the session header bar (clock)
		url: '/session',
		templateUrl: 'app/session/session.html',
        controller: 'SessionCtrl as session'
	})

})
