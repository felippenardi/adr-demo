<!-- adr.notes.js -->

var notesMod = angular.module('adr.notes', ['common.factories']);
notesMod.run(
	// run a function in the lodashFactory to remove lodash from the global scope
	function( _ ) {}
);

notesMod.controller('NotesCtrl', ['$window', '_', NotesCtrl])

function NotesCtrl($window, _) {
	var vm = this;
	vm.columns = [];

	vm.data = {

		categories: [
			{
				id: 1,
				name: 'issues'
			},
			{
				id: 2,
				name: 'offers'
			},
			{
				id: 3,
				name: 'facts'
			}
		],

		notes: [],

		parties: [
			{ id: 0, short_name: '--', selected: true },
			{ id: 1, short_name: 'GD', selected: false },
			{ id: 2, short_name: 'BS', selected: false  }
		]

	}

	// content types
	// category, party, group, offer, resolution (accepted offer), caucus, search results
	
	// column content
	// choosing a group or a caucus in the column menu will list all matching notes sequentially
	// searching on the same group or caucus will maintain the columns in which the notes belong
	
	// search
	//

	vm.caucus = [];
	vm.activeParty = false;


	/*
	var w = angular.element($window);
	vm.windowInnerWidth = $window.innerWidth;
	vm.windowInnerHeight = $window.innerHeight;

	w.bind('resize', function() {
		var width = $window.innerWidth;
		vm.windowInnerWidth = width;
		console.log(vm.windowInnerWidth);
	});
	*/

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

	vm.linkNotes = function() {};

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
};

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
			data: '='
		},
		bindToController: true,
		controllerAs: 'column',
		controller: function () {
			var vm = this;
			vm.contents = {
				heading: "",
				blocks: []
			};

			/*
			 *
			 *
			 * @heading is the heading text
			 *
			 */
			vm.setColumnHeading = function(heading) {
				vm.contents.heading = heading;
			};

			vm.addBlock = function(type, id) {
				block = {
					content_type: type,
					content_id: id
				}
				vm.contents.blocks.push(block);
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

			vm.addNote = function() {

				var party = _.first(_.where(vm.data.parties, { selected: true }));

				var note = {
					id: 'unk',
					category: vm.category,
					text: vm.next_note,
					party_id: party.id,
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

		},
		restrict: 'E',
		templateUrl: 'app/case.session.notes.directives.note.html'
	}
});
