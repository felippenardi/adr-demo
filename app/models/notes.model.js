/* notes.model.js */

(function() {

angular.module('notes.model', ['lodash.service', 'timestamp.value', 'restangular'])
    .service('notesModel', NotesModel);
    
/*
 * @class NotesModel
 * @classdesc Model for notes data
 * @ngInject
 */
function NotesModel(_, timestamp, Restangular, $q) {

    var service = { 
    	// caches the notes retrieved by the server
	    notes: [],
	    list: list,
	    create: create, 
	    get: get,
	    turnOffLinkMode: turnOffLinkMode,
        getNotesInLinkModeSortedByPriorityAndThenByCreated: getNotesInLinkModeSortedByPriorityAndThenByCreated
    };


    return service;


    // BIG FEATURE: how do I handle list when service.notes is empty, but the server has already been synced (there are no notes for this case yet)
    function list(caseId) {

	    return $q(function(resolve, reject) {

		    if(service.notes.length > 0) {

			resolve(service.notes);

		    } else {
			    var base = Restangular.one('cases', caseId).all('notes');

			    base.getList()

			    .then(function(data) {

				    service.notes = data;

				    var priority = 0;

				    /* REFACTOR: get priority from category service: category.getPriority(categoryId) */
				    for(i = 0; i < data.length; i++) {
					    switch (service.notes[i].category_id) {
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
					    }; // switch

					    service.notes[i].ux = {
						    link_mode: false,
						    priority: priority
					    };
				    }; // for

		    			resolve(service.notes);

			    }); // .then
		    }; // if else
	    }); // return $q( .... )
    };  // list()

    function create(note) {
	note.created = timestamp;

        return $q(function(resolve, reject) {
            var base = Restangular.all('notes');
	    base.post(note)
		    .then(function(data) {
			    data.ux = {
				priority: 1, 
				link_mode: false
			    };
			    service.notes.push(data);
			    resolve(service.notes);
		    },
		    function(error) {
			    reject(error);
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

	function get(id) {

		return _.find(service.notes, 'id', id);
        
		/*
		return $q(function(resolve, reject) {
			Restangular.one('notes').get({x: 'y'})
			.then(function(result) {
				var newResult = result;
				resolve(newResult);
			});
		});
		*/
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

	 /**** Manage link mode ****/
    function setLinkMode(noteId) {};

    function turnOffLinkMode() {
        for (i=0; i < service.notes.length; i++) {
            service.notes[i].ux.link_mode = false;
        }	
    };

    // OBSOLETE Replaced by filters
    function getNotesInLinkModeSortedByPriorityAndThenByCreated() {
        var notesInLinkMode = 
        _.chain(service.notes)
        .where({ 'ux': {'link_mode': true} })
        .sortByOrder(['priority', 'created'], ['asc', 'asc'])
        .value();	

        return notesInLinkMode;

    };
};

}())
