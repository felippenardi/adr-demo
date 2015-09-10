angular.module('adr.main', [
    'ui.router', 
    'restangular', 
    'pretty.json', 
    'dash.main', 
    'session.main', 
    'ngMockE2E'
])

.run(['Restangular', function(Restangular) {
    Restangular.setBaseUrl('http://localhost:8000/api');
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/dash");
	
	$stateProvider

    /*
     
	.state('user.login', {
        // login screen
	})

    */

    .state('dash', {
        //abstract: true,
        url: '/dash',
        // contains the navigation for the user dashboard
        templateUrl: 'app/dash/dash.main.html',
        controller: 'DashCtrl as dash'
    })

	.state('session', {
        // should contain the header for a session (clock, menu, ...)
		//abstract: true,
		url: '/session',
		templateUrl: 'app/session/session.main.html',
        controller: 'SessionCtrl as session'
	})

    /*
	.state('case', {
        // REFACTOR: should this be abstract so that I can have another state for case.list
		url: "/case",
		templateUrl: "app/cases/case.list.html"
	})

	.state('case.plan', {
		abstract: true,
		templateUrl: "app/case.plan.html"
	})

	.state('case.plan.basic', {
        // this may be redundant with case.plan
		url: "basic",
		templateUrl: "app/case.plan.basic.html"
	})

	.state('case.plan.attendees', {
		url: "attendees",
		templateUrl: "app/case.plan.attendees.html"
	})

	.state('case.plan.schedule', {
		url: "schedule",
		templateUrl: "app/case.plan.schedule.html"
	})

	.state('case.plan.statements', {
		url: "statements",
		templateUrl: "app/case.plan.statements.html"
	})

   */
}]);
