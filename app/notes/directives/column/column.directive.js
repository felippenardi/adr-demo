/* column.directive.js */
(function() {

angular.module('notes.module')

.directive('adrNotesColumn', ColumnDirective)

/*
 * @class ColumnDirective
 * @classdesc Directive for each column of notes displayed within the notes view
 * @ngInject
 */
function ColumnDirective() {
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
		controller: ColumnCtrl,
		templateUrl: 'app/notes/directives/column/column.directive.html'
	}

}

/*
 * @class ColumnCtrl
 * @classdesc Controller for the columnDirective
 * @ngInject
 */
function ColumnCtrl() {
    var vm = this;

    // open menu = true
    vm.menu = false;

	    /**** Modify - need to show a checkmark next to selected submenu item ****/
	    /*
    
    ngShow main menu
        - animate show	
        - animate hide
    Show submenu
        - hide on toggle (clicked back or closed the menu)
        - animate hide 

	    --- or ---
	    vm.menu = {
		open: false,
		items: [
			// Get categories from the model and loop through them
			{ name: 'categories', open: false, items: [{name: 'issues', selected: false}, { name: 'offers', selected: false }] },
			{ name: 'filters', open: false, items: [{ name: 'offers', selected: false }]},
			// Get parties from the model and loop through them
			{ name: 'parties', open: false, items: [{ name: 'party a', selected: false }],
		]
	    };

	    vm.toggleSubmenu = function(menu) {
		// close all submenus
		// open provided menu
	    }
	    */
    /*
categories
- issues
- offers
- facts
filters
- show offers (if category is issue)
- show linked notes
- party a
- party b
	*/

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
}

}())
