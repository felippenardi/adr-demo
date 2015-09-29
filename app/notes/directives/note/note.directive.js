(function() {

angular.module('notes.module')

.directive('adrNotesNote', NoteDirective)

/*
 * @class NoteDirective
 * @classdesc for each note displayed within the notes view
 * @ngInject
 */ 
function NoteDirective() {

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
function NoteCtrl($filter, _, $modal,  notesModel, linkingService, linkingsModel) {
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
	   if (!linkingService.linkMode[0]) {
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

    /*
     * @desc opens a modal for the user to add selected notes to an existing or new linking
     */
    vm.finishLinking = function() {

		// REFACTOR: don't forget to implement dismiss (2nd function)
        var modalInstance = $modal.open({
            templateUrl: 'app/notes/new_group_modal.html',
            controller: 'ModalCtrl',
            controllerAs: 'modal',
            bindToController: true,
            resolve: {
                defaultName: function() { 
                    
                    /* 
                     * notes_in_link_mode (collection)
                     *
                     * returns all notes in linked mode sorted first by priority and then by date
                     *
                     * returns array
                     */  
                    var notesInLinkMode = notesModel.getNotesInLinkModeSortedByPriorityAndThenByCreated()
                    var defaultName = notesInLinkMode[0].text.substring(0, 12);
                    return defaultName; 
                }, // defaultName
                existingLinkings: function() { return linkingsModel.list(1) }
            } // resolve
		}); // open the modal

        modalInstance.result.then(function(res) {
            //var notesToLink = linkModeFilter(notesModel.notes);
            
            // store all notes in link mode
            var notesToLink = $filter('filter')(notesModel.notes, { ux: {link_mode: true } });

            // REMOVE: I don't need to sort them here.  I can use this above when I create the default name
            var sorted = $filter('orderBy')(notesToLink, ['+ux.priority', '+ux.created']);

            if (res.isNew === true) {
                var name = res.linkingName;
                linkingsModel.create(name, notesToLink);
            }
        }); // handle modal response

    }; // finishLinking

}
