(function() {

angular.module('notes.module')

.directive('note', NoteDirective)

/*
 * @class NoteDirective
 * @classdesc for each note displayed within the notes view
 * @ngInject
 */ 
function NoteDirective(_) {

	return {
		scope: {
			note: '=',
			parties: '='
		},
		bindToController: true,
		controllerAs: 'note',
		controller: NoteCtrl,
		restrict: 'E',
		templateUrl: 'app/notes/directives/note/note.directive.html'
	}
}
}())

/*
 * @class NoteCtrl
 * @classdesc Controller for the noteDirective
 * @ngInject
 */
function NoteCtrl() {
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

}
