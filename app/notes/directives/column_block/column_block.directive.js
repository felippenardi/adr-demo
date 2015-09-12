(function() {

angular.module('notes.main')

.directive('columnBlock', ColumnBlockDirective)

/*
 * @class ColumnBlockDirective
 * @classdesc Directive for each block of notes in a column displayed within the notes view
 * @ngInject
 */
function ColumnBlockDirective() {
	return {
		restrict: 'E',
		scope: {
			block: '=',
			data: '='
		},
		bindToController: true,
		controllerAs: 'block',
		controller: ColumnBlockCtrl,
		templateUrl: 'app/notes/directives/column_block/column_block.directive.html'
	};
}

/*
 * @class ColumnBlockCtrl
 * @classdesc Controller for the columnBlockDirective
 * @ngInject
 */
function ColumnBlockCtrl() {
    vm = this;
    vm.setHeading = function(){};
    vm.setContents = function(content_type, content_id){
        vm.block.contents.type = content_type;
        vm.block.heading = 'content_id';
    };
}

}())
