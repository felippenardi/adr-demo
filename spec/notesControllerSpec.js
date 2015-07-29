describe('NotesController', function() {
	beforeEach(angular.mock.module('adr.notes'));
	var $controller;

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));

	/*
	describe('addNote', function() {

		it('adds a note', function() {
			var controller = $controller('NotesCtrl');
			expect(controller.notes).toEqual([]);
			controller.current_note = "test note";
			controller.addNote();
			expect(controller.notes).toEqual([{text: 'test note'}]);
		});
	});
	*/

	describe('addColumn', function() {

		it('adds a column', function() {
			var controller = $controller('NotesCtrl');
			controller.addColumn();
			expect(controller.columns.length).toEqual(1);
		});


	});
});
