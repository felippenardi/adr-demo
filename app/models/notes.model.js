/* notes.model.js */

(function() {

angular.module('notes.model', ['lodash.service', 'restangular'])
    .service('notesModel', NotesModel);
    
/*
 * @class NotesModel
 * @classdesc Model for notes data
 * @ngInject
 */
function NotesModel(_, Restangular, $q) {

    var service = { 
	    list: list,
	    create: create 
    };

    return service;

    function list(caseId) {
        // FEATURE: may need to convert timestamp to suitable format and place in ux
        return $q(function(resolve, reject) {
            var base = Restangular.all('notes');
            
            base.getList()

            .then(function(result) {

                var priority = 0;

                /* REFACTOR: get priority from category service: category.getPriority(categoryId) */
                for(i = 0; i < result.length; i++) {
                    switch (result[i].category_id) {
                        case 1:
                            // issue
                            priority = 1;
                            break;
                        case 2:
                            // proposal
                            priority = 2;
                            break;
                        case 3:
                            // fact
                            priority = 3;
                            break;
                    }

                    result[i].ux = {
                        link_mode: false,
                        priority: priority
                    };
                }
                resolve(result);
            });
        });
    };

    function create(note) {
        // FEATURE: may need to convert timestamp to format required for service

	var timestamp = Date.now();
	note.created = timestamp;

        return $q(function(resolve, reject) {
		// REFACTOR: move base to global	
            var base = Restangular.all('notes');
	    base.post(note)
		    .then(function(data) {
			    resolve(data)
		    },
		    function(error) {
			    resolve(error);
		    });	
	});

    };

	/*
	 * IMPORTANT
	 *
	 * I will need to use the old way if I require the notify or
	 * progress method of $q since Angular has not implemented
	 * them yet.
	 *
	 */

	function get() {
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
	service.get = function() {
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

    function setLinkMode(noteId) {}
    function getNotesInLinkMode() {} // might be better placed in notes.filters.js
    function clearNotesInLinkMode() {}
};

}())
