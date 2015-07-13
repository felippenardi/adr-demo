describe('NotesController', function() {
	beforeEach(module('adr.notes'));
	var $controller;

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));

	describe('addNote', function() {

		it('adds a note', function() {
			var controller = $controller('NotesCtrl');
			expect(controller.notes).toEqual([]);
			controller.current_note = "test note";
			controller.addNote();
			expect(controller.notes).toEqual([{text: 'test note'}]);
		});
	});

	describe('addColumn', function() {

		it('adds a column', function() {
			var controller = $controller('NotesCtrl');
			controller.addColumn();
			expect(controller.columns.length).toEqual(1);
		});


	});

	describe('setColumnContents', function () {
		it('sets a columns content', function () {
			var controller = $controller('NotesCtrl');
			controller.addColumn();
			controller.addColumn();
			controller.addColumn();
			controller.setColumnContents(1, 'category', 3)
			expect(controller.columns[1].content_type).toEqual('category');
			expect(controller.columns[1].content_id).toEqual(3);
		});
	});
});
