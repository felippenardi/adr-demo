angular.module('notes.module')

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

	.state('session.notes', {
		url: "/notes",
		templateUrl: "app/notes/notes.html",
		// I'm not sure I'll need this controller once all the directives are implemented
		// just load the template w/o a controller
		controller: 'NotesCtrl as notes',
        resolve: {
		// No need to set values.  Just execute the promises

            columns: function(columnsModel) {
                return columnsModel.columns;
            },

            categories: function(categoriesModel) {
                return categoriesModel.list(1);
            },

            parties: function(partiesModel) {
                return partiesModel.list(1);
            },

            notes: function(notesModel) {
                return notesModel.list(1);
            },

            linkings: function(linkingsModel) {
                return linkingsModel.list(1);
            }

        }

	})

})
