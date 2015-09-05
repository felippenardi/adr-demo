angular.module('adr.main', ['ui.router', 'pretty.json', 'adr.notes'])

.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/case/list");
	
	$stateProvider

    /*
    .state('main', {
        abstract: true,
        url: '#',
        // contains applcation main bar
        templateUrl: "adr.main.html"
    })

	.state('login', {
        // login screen
	})

    .state('admin', {
        abstract: true,
        url: "admin",
        // contains the navigation for the admin
        templateUrl: "app/admin.html"
    })
    */

	.state('case', {
        // REFACTOR: should this be abstract so that I can have another state for case.list
		url: "case",
		templateUrl: "app/cases/case.list.html"
	})

	.state('case.session', {
        // should contain the header for a session (clock, menu, ...)
		abstract: true,
		url: "session",
		template: "<ui-view />"
	})

	.state('case.session.notes', {
		url: "notes",
		templateUrl: "app/notes/notes.main.html",
		controller: 'NotesCtrl as notes'
	})

    // may replace with a modal
	.state('case.session.statements', {})

	.state('case.session.resolutions', {})

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

})
