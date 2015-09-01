/* adr.notes.js */

// REMOVE - this is just a hack for generating ids
var getId = function() {
	return Math.floor(Math.random() * 1000 + 1);
}

var notesMod = angular.module('adr.notes', ['common.factories', 'ui.bootstrap', 'ui.select', 'ngSanitize']);

notesMod.run(
	// run a function in the lodashFactory to remove lodash from the global scope
	function( _ ) {}
);

notesMod.controller('NotesCtrl', ['$window', '_', '$modal', NotesCtrl])

function NotesCtrl($window, _, $modal) {

	var vm = this;

	vm.columns = [];

	vm.caucus = [];

	vm.activeParty = false;

	vm.data = {

		categories: [
			{
				id: 1,
				name: 'issues',
				priority: 1
			},
			{
				id: 2,
				name: 'offers',
				priority: 2
			},
			{
				id: 3,
				name: 'facts',
				priority: 3
			}
		],

		notes: [],

		parties: [
			{ id: 0, short_name: '--', selected: true },
			{ id: 1, short_name: 'GD', selected: false },
			{ id: 2, short_name: 'BS', selected: false  }
		],


		/*
		* linkings
		*
		* stores the linkings created by the user
		*/
		linkings: []

	}

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
			templateUrl: 'newGroupModal.html',
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

};

notesMod.controller('ModalCtrl', function($modalInstance, defaultName, existingLinkings) {
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
});

notesMod.directive('column', function() {
	/*
	 * I should be able to pass the index position of this column
	 * into the scope using @ or & so I can add it to the left or right
	 * into the array.
	 * 
	 * remember that I need to use {{$index}} to pass the value in 
	 * Another way could be to pass a function into the directive with a
	 * signature: addColumn(position)
	 */
	 
	return {
		restrict: 'E',
		scope: {
			column: '=',
			data: '=',
			index: '@',
			add: '&'
		},
		bindToController: true,
		controllerAs: 'column',
		controller: function () {
			var vm = this;
			vm.hovering = false;
			vm.mouseEnter = function() {
				vm.hovering = true;
			}
			vm.mouseExit = function() {
				vm.hovering = false;
			}

			vm.addColumn = function(direction) {
				var position = +vm.index;
				
				if (direction === 'right') {
					position = position + 1;
				}

				console.log('child', position);
				// call the parent's addEmptyColumn func
				vm.add({position: position});
			}

			/*
			 *
			 *
			 * @heading is the heading text
			 *
			 */
			vm.setColumnHeading = function(heading) {
				vm.column.heading = heading;
			};

			vm.addBlock = function(type, id) {
				block = {
					content_type: type,
					content_id: id
				}
				vm.column.blocks.push(block);
			};

			/*
			 * 
			 * @position is the block to modify 
			 * @type is something like category, group, party
			 * @id is the unique identifier of a member of
			 * the type container
			 */
			vm.setBlockContents = function(position, type, id) {};
		},
		templateUrl: 'app/case.session.notes.directives.column.html'
	}

});

notesMod.directive('columnBlock', function() {
	return {
		restrict: 'E',
		scope: {
			block: '=',
			data: '='
		},
		bindToController: true,
		controllerAs: 'block',
		controller: function () {
			vm = this;
			vm.setHeading = function(){};
			vm.setContents = function(content_type, content_id){
				vm.block.contents.type = content_type;
				vm.block.heading = 'content_id';
			};
		},
		templateUrl: 'app/case.session.notes.directives.column_block.html'
	};
});

notesMod.directive('category', function(_) {

	// REFACTOR: scope isolation for category should be an @

	return {
		restrict: 'E',
		scope: {
			category: '=',
			data: '='
		},
		bindToController: true,
		controllerAs: 'category',
		controller: function() {

			var vm = this;
			vm.next_note = "";

			var categoryObj = _.first(_.where(vm.data.categories, { id: vm.category } ));

			vm.addNote = function() {

				var party = _.first(_.where(vm.data.parties, { selected: true }));


				var note = {
					id: getId(),
					created: Date.now(),
					category: vm.category,
					text: vm.next_note,
					party_id: party.id,
					priority: categoryObj.priority,
					selected: false,
					link_mode: false
				};

				vm.data.notes.push(note);
				vm.next_note = "";
			};

			// so that it effects all notes
			vm.selectParty = function(partyId) {
				vm.data.parties = _.map(vm.data.parties, function(party) {
					var p = {};
					p.id = party.id;
					p.short_name = party.short_name;
					if (party.id == partyId) {
						p.selected = true;
					} else {
						p.selected = false;
					}
					return p;
				});
			};

		},
		templateUrl: 'app/case.session.notes.directives.category.html'
	};

});

notesMod.directive('note', function(_) {

	return {
		scope: {
			note: '=',
			parties: '='
		},
		bindToController: true,
		controllerAs: 'note',
		controller: function() {
			var vm = this;
			vm.party = _.get(_.first(_.where(vm.parties, {'id': vm.note.party_id})), 'short_name');

			vm.strikeOut = function(){
				vm.note.strike = !vm.note.strike;	
			};

			vm.select = function() {
				vm.note.selected = !vm.note.selected;
			};

			vm.link = function() {
				vm.note.link_mode = !vm.note.link_mode;
			}

		},
		restrict: 'E',
		templateUrl: 'app/case.session.notes.directives.note.html'
	}
});
