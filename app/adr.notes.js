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
	vm.selectedParty = false;
	vm.caucus = [];
	vm.current_note = "";
	vm.windowInnerWidth = $window.innerWidth;
	vm.windowInnerHeight = $window.innerHeight;

	w.bind('resize', function() {
		var width = $window.innerWidth;
		vm.windowInnerWidth = width;
		console.log(vm.windowInnerWidth);
		//console.log(width);
	});

	vm.addColumn = function() {
		new_column = {
			content_type: false,
			content_id:   false
		};
		vm.columns.push(new_column)
	};

	/**
	 * enforce one column in focus at a time
	 *
	 *
	 */
	vm.focusOnColumn = function(index) {

	};

	// REFACTOR: move to column directive
	vm.setColumnContents = function(index, type, id) {
		vm.columns[index].content_type = type;
		vm.columns[index].content_id = id;	
	};

	vm.addNote = function() {
		/*
		 *
		 * category
		 * party - vm.selectedParty
		 *
		 */
		var note = {
			text: vm.current_note
		}
		vm.notes.push(note);
		vm.current_note = "";
	};
};

notesMod.directive('column', function() {
	/*
	 * I should be able to pass the index position of this column
	 * into the scope using @ or & so I can add it to the left or right
	 * into the array.
	 * 
	 * remember that I need to use {{$index}} to pass the value in
	 *
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
			var add = function(direction, position) {
				/*
				 * Is it better to pass the position in from the 
				 * ng-click call or use the scope.position.
				 */
				scope.addColumn(position);
			};

			/*
			 * type is something like category, group, party
			 * handle is the unique identifier of a member of
			 * the type container
			 */
			var setContents = function(type, handle) {}

			/*
			 * look at notes for specs on how this should work
			 */
			var sortContents = function() {}

			var close = function() {}

			// NOTE: the menu will be implemented  common menu directive so no
			// function for opening and closing is needed here
			
			

		}
	}

});

/*
 * I'm not sure that a directive makes since for categories
 */
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
			vm.notes = []
			vm.addNote = function(note){};
		}
	}

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

/*
// This should probably be the controller
.directive('NotesDirective', function() { 
	return {

		controller: function() {
			var vm = this;
			vm.categories = [];
			vm.beginCaucus = function(party) {};
			vm.endCaucus = function() {};
			vm.activateCategory = function(category) {};
			vm.deactivateCategory = function(category) {};
			vm.createCategory = function(category) {
				// call a service
			};
		}
	}
});

.directive('ColumnDirective', function() {
	// can I just bind to a notes.category model?
	// whenever it changes the filter will be applied automatically 
	// to show the category's notes sorted by timestamp
	return {
		controller: function () {
			var vm = this;
			vm.category = 'issues';
			vm.setCategory = function (category) {};
		}
	}
});
*/
/*

.directive('CategoryMenu', function() {});

// REFACTOR: I feel like this should be in a higher level module (The Session Module?)
.directive('SessionMenu', function () {

	return {

		controller: function () {
			var vm = this;
			// should I control the settings menu here as well?
			// I think the status of these vars maybe stored in the controller
			vm.areSettingsOpen = false;
			vm.isMenuOpen = false;
			vm.toggleOpen = function() {};
			vm.toggleSettings = function() {};
		}

	}
}

*/
