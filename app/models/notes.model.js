/* notes.model.js */

angular.module('note.model', ['common.factories', 'restangular'])

// create a file of constants in the common directory
// loads from a config file
// api tokens
// csrf salt
// domain = localhost
// port = 8080
// apiBaseUrl = /api

.service('noteModel', function(_, Restangular, $q) {
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
        // if connection error then use local storage
        
        // if no connection error then check for unsynced data and sync.  I'll set a global constant to true if any data is unsynced
        
		return $q(function(resolve, reject) {
			Restangular.one('notes').get({x: 'y'})
			.then(function(result) {
				var newResult = result;
                /*
                 *
                 * create out object containing each note & add ux object
                 *
                 * modifiedResult = {
                 *   data: result,
                 *   ux: {
                 *      link_mode: false
                 *   }
                 *
                 * }
                 */
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
