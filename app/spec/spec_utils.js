angular.module('spec.utils', [])

.service('specUtils', function() {

    var service = {
        generateId: generateId,
        createRawNote: createRawNote,
        createNoteToPost: createNoteToPost,
        createResponseNote: createResponseNote,
        createStoredNote: createStoredNote
    };
    return service;

    function generateId() {
        return Math.floor((Math.random() * 1000000) + 1);
    };

	function createRawNote(category, text, party) {
		return {
			category: category,
			text: text,
			party: party
		};
	};

	function createNoteToPost(category, text, party, ts) {
		return {
			category: category,
			text: text,
			party: party,
			created: ts
		};
	};

	function createResponseNote(id, category, text, party, ts) {
		return {
			id: id,
			category: category,
			text: text,
			party: party,
			created: ts
		};
	};

	function createStoredNote(id, category, text, party, ts, priority, link_mode) {
		return {
			id: id,
			category: category,
			text: text,
			party: party,
			created: ts,
			ux: {
				priority: priority,
				link_mode: link_mode
			}
		};
	};



}); // specUtils
