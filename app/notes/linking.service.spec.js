describe('linkingService', function() {

	var linkingService;
	var mockNotesModel;

	beforeEach(module('ui.router'));
	beforeEach(module('notes.module'));

	beforeEach(
		module(function($provide) {
			$provide.service('notesModel', function() {
				this.turnOffLinkMode = jasmine.createSpy('turnOffLinkMode');
			});
		})
	);

	beforeEach(inject(function(_notesModel_, _linkingService_) {
		mockNotesModel = _notesModel_;
		linkingService = _linkingService_;
	}));

	describe('toggleLinkMode', function() {
		it('should toggle link mode', toggleLinkModeShouldToggleLinkMode);
		xit('should ask notes model to turn off link mode', toggleLinkModeShouldAskNotesModelToTurnOffLinkMode);
	}); // describe toggleLinkMode

	/**** BEGIN TEST IMPLEMENTATIONS ****/

	function toggleLinkModeShouldToggleLinkMode() {
		expect(linkingService.linkMode).toEqual([false]);

		// turn on
		linkingService.toggleLinkMode();
		expect(linkingService.linkMode).toEqual([true]);

		// turn off
		linkingService.toggleLinkMode();
		expect(linkingService.linkMode).toEqual([false]);

	};

	function toggleLinkModeShouldAskNotesModelToTurnOffLinkMode() {
		// turn on
		linkingService.toggleLinkMode();

		// turn off
		linkingService.toggleLinkMode();
		// link_mode needs to be set to false for each note when linkMode is turned off.
		expect(mockNotesModel.turnOffLinkMode()).toHaveBeenCalled();
	};

}); // describe linkingService
