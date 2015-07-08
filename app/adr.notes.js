<!-- adr.notes.js -->

var notesMod = angular.module('adr.notes', [])

notesMod.controller('NotesCtrl', ['$window', NotesCtrl])

function NotesCtrl($window) {
	var w = angular.element($window);
	var vm = this;
	vm.notes = [];
	vm.categories = [];
	vm.current_note = "";
	vm.windowInnerWidth = $window.innerWidth;
	vm.windowInnerHeight = $window.innerHeight;

	w.bind('resize', function() {
		var width = $window.innerWidth;
		vm.windowInnerWidth = width;
		console.log(vm.windowInnerWidth);
		//console.log(width);
	});

	vm.addCategory = function(name) {
		vm.categories.push({name: name})
	}

	vm.addNote = function() {
		var note = {
			text: vm.current_note
		}
		vm.notes.push(note);
		vm.current_note = "";
	};
};

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

.directive('CategoryDirective', function() {

	return {
		controller: function() {
			var vm = this;
			vm.notes = []
			vm.addNote = function(note){};
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
