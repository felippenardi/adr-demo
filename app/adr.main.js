angular.module('adr.main', ['ui.router', 'pretty.json', 'adr.notes'])

.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/case/list");
	
	$stateProvider

	.state('app', {

	})

	.state('case', {
		url: "case",
		templateUrl: "app/case.list.html"
	})

	.state('case.session', {
		abstract: true,
		url: "session",
		template: "<ui-view />"
	})

	.state('case.session.notes', {
		url: "notes",
		templateUrl: "app/case.session.notes.html",
		controller: 'NotesCtrl as notes'
	})

	.state('case.session.statements', {})
	.state('case.session.resolutions', {})

	.state('case.plan', {
		abstract: true,
		templateUrl: "app/case.plan.html"
	})

	.state('case.plan.basic', {
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
