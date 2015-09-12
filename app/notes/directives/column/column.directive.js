(function() {

angular.module('notes.main')

.directive('column', ColumnDirective)

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
