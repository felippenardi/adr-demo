/* notes.main.js */

(function() {

// REMOVE - this is just a hack for generating ids
var getId = function() {
	return Math.floor(Math.random() * 1000 + 1);
}

angular.module('notes.main', [
    'lodash.service', 
    'ui.bootstrap', 
    'ui.select', 
    'ngSanitize'
])

.controller('NotesCtrl', NotesCtrl)
.controller('ModalCtrl', ModalCtrl)

/*
 * @class NotesCtrl
 * @classdesc Main controller for the notes view
 * @ngInject
 */
function NotesCtrl(
    $window, 
    _, 
    $modal, 
    columns, 
    categories, 
    parties, 
    linkings, 
    notes
) {

	var vm = this;

	vm.columns = columns;

	vm.caucus = [];

	vm.activeParty = false;

	vm.data = {

        categories: categories,
        parties: parties,
		notes: notes,

		/*
		* linkings
		*
		* stores the linkings created by the user
		*/
		linkings: linkings 

	};

	/*
	* selectedLinkings (collection)
	*
	* stores the linkings the user wants to view
	*/ 
	vm.selectedLinkings = [];

	/*
	* selectedLinkingsForNewNotes (collection)
	*
	* stores the linkings to which the user wants to add more notes
	*/ 
	vm.selectedLinkingsForNewNotes = [];

	vm.addEmptyColumn = function(position) {
		vm.columns.splice(position, 0, {});
	}

	/*
	 * New columns only have one block so its safe to 
	 * set the column heading and block heading as the same
	 * 
	 *
	 *
	 */
	vm.addColumn = function(contentType, contentId) {
		var heading = "";

		if (contentType == 'category') {
			heading = _.where(vm.data.categories, { 'id': contentId });
			heading = _.get(_.first(heading), 'name');
		}

		var new_column = {
			heading: heading,
			blocks: [
				{
				heading: heading,
				contents: { type: contentType, id: contentId }
			}

			],
		};
		vm.columns.push(new_column);
	};

	var getNotesInLinkModeSortedByPriorityAndThenTime = function() {

		/* 
		 * notes_in_link_mode (collection)
		 *
		 * returns all notes in linked mode sorted first by priority and then by date
		 *
		 * returns array
		 */  
		var notes = 
			_.chain(vm.data.notes)
			.where({ 'link_mode': true })
			.sortByOrder(['priority', 'created'], ['asc', 'asc'])
			.value();	

		return notes;

	};

	var createNewLinking = function(name, notes) {
		var newLinking = {
			id: getId(),
			name: name,
			notes: notes 
		};
		return newLinking;
	};

	var clearNotesInLinkMode = function() {
		vm.data.notes = _.map(vm.data.notes, function(note) {
			var newNote = note;
			newNote.link_mode = false;
			newNote.selected = false;
			return newNote;
		});
	}

	vm.linkNotes = function() {

		var notesInLinkMode = getNotesInLinkModeSortedByPriorityAndThenTime();

		// The default name is the truncated text of the oldest note belonging to the highest priority category
		var defaultName = notesInLinkMode[0].text.substring(0, 12);

		// Show a modal for the user to select a group or name a new group
		var modalInstance = $modal.open({
			templateUrl: 'app/notes/newGroupModal.html',
			controller: 'ModalCtrl',
			controllerAs: 'modal',
			bindToController: true,
			resolve: {
				defaultName: function() { return defaultName },
				existingLinkings: function() { 
					return vm.data.linkings;
				}	
			}

		});

		// REFACTOR: don't forget to implement dismiss (2nd function)
		// handles the promise returned by the modal instance
		modalInstance.result.then(function(res) {

			// create an array containing just the ids of the notes
			var noteIdsToLink = _.map(notesInLinkMode, 'id');
			
			// linking will hold the name of the new linking
			if (res.isNew === true) {
				
				// create a new linking & add selected notes
				var newLinking = createNewLinking(res.linking, noteIdsToLink);
				vm.data.linkings.push(newLinking);

			} else {
				// add notes to an existing linking
			}

			// TODO: clear link_mode in all notes
			clearNotesInLinkMode();

		}, function() { /* dismiss handler */ });

	};
	
    /* REFACTOR: REMOVE THIS */
	var toBeNamed = function() {
		/* 
		* newLinking (object)
		*
		* stores the object containing the new linking
		*
		* id: unique identifier
		* name: the name of the linking
		* hint: the first x # charaters of the second highest priority note belonging to the linked notes
		*/
		var newLinking = {};

		/* 
		 * notes_in_linked_mode (collection)
		 *
		 * all notes in linked mode sorted first by priority and then by date
		 */  
		var notes_in_linked_mode = 
			_.chain(vm.data.notes)
			.where({ 'link_mode': true })
			.sortByOrder(['priority', 'created'], ['asc', 'asc'])
			.value();	
		
		if (vm.selectedLinkingsForNewNotes.length > 0) {
			/*
			* The user is adding notes to an existing linking
			*
			* 
			* 
			*/  
			// probably just going to merge these notes with notes.linkings

		} else if (vm.newNotesName !== "") {
			/*
			* The user is creating a new linking and IS providing the name
			*/

			newLinking.name = vm.newNotesName;

			// clear newNotesName
			vm.newNotesName = "";

		} else {

			/*
			* The user is creating a new linking and is NOT providing the name 
			*
			*/
			// make sure at least 2 notes are selected

			// create a link name
			var highestPriorityNote = notes_in_linked_mode[0];
			var name = highestPriorityNote.text.substring(0, 12);
			newLinkings.name = name;
		}

		// THIS NEEDS TO GO INTO A FUNCTION SINCE IT DOESN'T BELONG HERE
		/* 
		* Create a hint for the new linking
		* 
		* hint (string)
		*
		* The hint is some text belonging to the next highest priority note in the linking
		* It serves to remind the user of the linking's purpose
		*/
		var secondHighestPriorityNote = notes_in_linked_mode[1];
		var hint =  secondHighestPriorityNote.text.substring(0, 24);
		newLinking.hint = hint;

		vm.data.linkedNotes.push(newLinking);

		// newNotesName is created in the template
		// case.session.notes.html
	};

	vm.linkOffersToIssue = function() {};

	vm.focusOnIssue = function(issueId) {
		// noteEditor directive
		// - pass in the category
		// - addNote should be moved to this directive
		// focusedIssue content type directive 
		// - issue name
		// - done button
		// - back to notes link
		// proposalsByParty content type directive
		// - needs to have the note editor directive
		// linkedWithNote content type directive
		// - displays a block for each category containing linked notes
		// linkedWithNoteByCategory content type directive
		// - displays a column with a single block containing category notes related to the note
		// acceptedOffersByIssue content type directive
		// - block that is meant to be added below the focused issue
		// D & D offers into accepted block
	};

	var w = angular.element($window);
	vm.windowInnerWidth = $window.innerWidth;
	vm.windowInnerHeight = $window.innerHeight;

	w.bind('resize', function() {
		var width = $window.innerWidth;
		vm.windowInnerWidth = width;
		var height = $window.innerHeight
		vm.windowInnerHeight = height;
		console.log(vm.windowInnerWidth);
		console.log(vm.windowInnerHeight);
	});

}

/*
 * @class ModalCtrl
 * @classdesc Controller for the create new linking modal
 * @ngInject
 */
function ModalCtrl($modalInstance, defaultName, existingLinkings) {
	vm = this;
	vm.newLinkingName = defaultName;
	vm.existingLinkings = existingLinkings;
	vm.isANewLinking = true;

	vm.toggleIsANewLinking = function() {
		vm.isANewLinking = !vm.isANewLinking;
	};	

	vm.saveLinking = function() {
		var res = {
			linking: vm.newLinkingName,
			isNew: true
		};
		$modalInstance.close(res);
	};
}

}())
