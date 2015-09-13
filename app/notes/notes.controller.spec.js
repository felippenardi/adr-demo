describe('NotesController', function() {
	beforeEach(angular.mock.module('notes.main'));
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

    describe('addEmptyColumn', function() {
        
        it('adds an empty column', function() {
            var ctrl = $controller('NotesCtrl');
            ctrl.addEmptyColumn(0);
            expect(ctrl.columns[0]).toEqual({});
            ctrl.addEmptyColumn(1);
            expect(ctrl.columns[1]).toEqual({});
            ctrl.addEmptyColumn(0);
            expect(ctrl.columns[0]).toEqual({});
            expect(ctrl.columns.length).toEqual(3);
        });
    });

});
