describe('linkModeFilter', function() {

    beforeEach(module('ui.router', 'notes.module'));
    var linkModeFilter,
        notes;

    beforeEach(inject(function(_linkModeFilter_) {
        linkModeFilter = _linkModeFilter_;
    }));

    beforeEach(function() {
        notes = [
            {
                id: 1,
                name: 'one',
                ux: {
                    link_mode: true
                }
            }, {
                id: 2,
                name: 'two',
                ux: {
                    link_mode: false
                }
            }, {
                id: 3,
                name: 'three',
                ux: {
                    link_mode: true
                }
            }, {
                id: 4,
                name: 'four',
                ux: {
                    link_mode: true 
                }
            }
        ];

    }); // beforeEach

    it('should filter notes in linke mode', function() {

        var filtered = linkModeFilter(notes);
        expect(filtered.length).toEqual(3);

        for(i=0; i < filtered.length; i++) {
            expect(filtered[i].ux.link_mode).toEqual(true);
        }

    });

}); // describe linkModeFilter
