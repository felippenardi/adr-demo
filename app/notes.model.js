/* notes.model.js */

var notesModel = angular.module('notes.model', ['common.factories', 'restangular'])

// create a file of constants in the common directory
// loads from a config file
// api tokens
// csrf salt
// domain = localhost
// port = 8080
// apiBaseUrl = /api

notesModel.service('notesModel', function(_, Restangular, $q) {
	var notes = this;

	/*
	 * IMPORTANT
	 *
	 * I will need to use the old way if I require the notify or
	 * progress method of $q since Angular has not implemented
	 * them yet.
	 *
	 */
	notes.get = function() {
		return $q(function(resolve, reject) {
			Restangular.one('/notes').get({x: 'y'})
			.then(function(result) {
				var newResult = result;
				resolve(newResult);
			});
		});
	};

	/*
	 * This is the old way of creating a promise
	 *
	notes.get = function() {
		var defer = $q.defer()
		Restangular.one('/notes').get({x: 'y'})
		.then(function(result) {
			var newResult = result;
			defer.resolve(newResult);
		});
		return defer.promise;
	};	
	*/

	/*
	 * success
	 * check for unsynced data and sync it
	 * add note to local with synced set to true
	 *
	 * error
	 * if 404 then offline mode
	 */
});
