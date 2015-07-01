angular.module('adr.main', ['ui.router'])

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
		templateUrl: "app/case.session.notes.html"
	})

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

/*
.controller('MainController', [MainController])

MainController = function() {}

.service('TagsService')
.service('NotesService')
.service('CaucusService')
.controller('RecordNotesCtrl') // createGroup(), activateTag(), deactivateTag() ...
.directive('TagColumn') // TagColumnCtrl select(), activate(), deactivate()
.directive('Note') //NoteCtrl // addToGroup, select()
*/
