/* linking.service.js */

(function() {

angular.module('notes.module')
.service('linkingService', LinkingService);

/*
 * @class LinkingService
 * @classdesc Service to manage link mode for linking note
 * @ngInject
 */ 
function LinkingService(notesModel) {
	var service = { 
		linkMode: false,
		toggleLinkMode: toggleLinkMode 
	};

	return service;

	function toggleLinkMode() { 
		service.linkMode = !service.linkMode;

		// unflag link_mode for each note
		if(service.linkMode == false) {
			notesModel.turnOffLinkMode();
		}
	};

}; // LinkingService

}())
