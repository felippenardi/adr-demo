(function() {

angular.module('notes.module')

.directive('adrNotesNote', NoteDirective)

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
function NoteCtrl(notesModel, linkingService) {
    var vm = this;
    vm.linkMode = linkingService.linkMode;
    vm.party = _.get(_.first(_.where(vm.parties, {'id': vm.note.party_id})), 'short_name');

    vm.strikeOut = function(){
        vm.note.strike = !vm.note.strike;	
    };

    vm.select = function() {
        vm.note.selected = !vm.note.selected;
    };

    /*
     * @method
     * @name link
     * @desc turn on link mode and add note to link mode
     */
    vm.link = function() {
	   // I need this to propogate because the notes will all load with linkMode set to false.  Otherwise, I have to do this manually in the link, cancel, and unlink functions which sucks.
	   if (!linkingService.linkMode) {
		linkingService.toggleLinkMode();
	   }

        vm.note.ux.link_mode = true;
    };
    
    vm.unlink = function() {
	    // MAJOR: use the linking service to remove this note from the active linking(s)
	    // MAJOR: if this is the only note in link_mode then turn off linkMode
    	vm.note.ux.link_mode = false;
    };
    vm.cancelLinking = function() {
   	linkingService.toggleLinkMode(); 
    };
    
    vm.finishLinking = function() {};

}
