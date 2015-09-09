angular.module('session.main', ['ui.router', 'notes.model', 'notes.main'])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

	.state('session.notes', {
		url: "notes",
		templateUrl: "app/notes/notes.main.html",
        resolve: {
            notes: function(notesModel) {
                return notesModel.list(1);
            }
        },
		controller: 'NotesCtrl as notes'
	})

    // may replace with a modal
	.state('session.statements', {})

	.state('session.resolutions', {})

})

.controller('SessionCtrl', [SessionCtrl])

function SessionCtrl(){};
