<!-- adr.notes.js -->

/**
 *
 * I think there should be a session.case shell.
 * The notes would occupy the view.
 * This controller and subsequent directives will control the view
 *
 */

var notesMod = angular.module('adr.notes', [])

notesMod.controller('NotesCtrl', ['$window', NotesCtrl])

function NotesCtrl($window) {
	var w = angular.element($window);
	var vm = this;
	vm.columns = [];
	vm.categories = [];
	vm.notes = [];
	vm.caucus = [];
	vm.activeParty = false;
	vm.windowInnerWidth = $window.innerWidth;
	vm.windowInnerHeight = $window.innerHeight;

	w.bind('resize', function() {
		var width = $window.innerWidth;
		vm.windowInnerWidth = width;
		console.log(vm.windowInnerWidth);
		//console.log(width);
	});

	vm.addColumn = function() {
		var new_column = {
			position: false,
			content_type: false,
			content_id:   false,
			editable: true
		};
		vm.columns.push(new_column);
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
			position: '@',
			addColumn: '&'
		},
		bindToController: true,
		controllerAs: column,
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
		templateUrl: 'case.session.notes.directives.column.html'
	}

});

notesMod.directive('columnBlock', function() {
	return {
		restrict: 'E',
		scope: {
			block: block
		},
		bindToController: true,
		controllerAs: block,
		controller: function () {
			vm = this;
			vm.setHeading = function(){};
			vm.setContents = function(){};
		},
		templateUrl: 'case.session.notes.directives.block.html'
	};
});

notesMod.directive('category', function() {

	return {
		restrict: 'E',
		scope: {
			category: '='
		       },
		bindToController: true,
		controllerAs: 'category',
		controller: function() {
			var vm = this;
			vm.new_note = "";

			vm.addNote = function() {
				/*
					*
					* category
				* party - vm.selectedParty
				*
					*/
				var note = {
					text: vm.new_note
				}
				vm.notes.push(note);
				vm.current_note = "";
			};

		},
		templateUrl: 'case.session.notes.directives.category.html'
	};

});

notesMod.directive('note', function() {
	return {
		scope: {
			note: '='
		},
		bindToController: true,
		controllerAs: 'note',
		controller: function() {
			var vm = this;
			vm.strike = false;
			vm.strikeOut = function(){
				this.note.strike = true;	
				this.strike = true;
			};
		},
		restrict: 'E',
		//template: "{{note}}"
		templateUrl: 'app/case.session.notes.directives.note.html'
	}
});
