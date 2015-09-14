angular.module('notes.module')

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

	.state('session.notes', {
		url: "/notes",
		templateUrl: "app/notes/notes.html",
		controller: 'NotesCtrl as notes',
        resolve: {

            columns: function(columnsModel) {
                return columnsModel.list();
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
