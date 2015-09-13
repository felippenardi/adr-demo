describe('notesModel', function() {

	var notesModel,
	httpBackend,
	Restangular,
	q;
            

    var testNotes = [
        {
            id: 1,
            created: '01-19-2015:00:00:01',
            category_id: 1,
            text: 'note 1',
            party_id: 1
        }, {
            id: 2,
            created: '01-19-2015:00:00:02',
            category_id: 2,
            text: 'note 2',
            party_id: 1
        }, {
            id: 3,
            created: '01-19-2015:00:00:03',
            category_id: 3,
            text: 'note 3',
            party_id: 1
        }
    ];

	beforeEach(module('notes.model'));
	
	beforeEach(inject(function(_notesModel_, _Restangular_, _$httpBackend_, $q) {
		notesModel = _notesModel_;
		Restangular = _Restangular_;
		httpBackend = _$httpBackend_;
		q = $q;

        httpBackend.when('GET', '/notes').respond(testNotes);
	}));
       
    describe('list', function() {
        
        it('gets all notes for a case and adds ux data to notes object', function() {

            spyOn(Restangular, 'all').and.callThrough();

            var test = function(notes) {
                expect(Restangular.all).toHaveBeenCalledWith('notes');
                for(i=0;i<notes.length;i++) {
                    expect(notes[i].ux.link_mode).toEqual(false);
                }

                expect(notes[0].ux.priority).toEqual(1);
                expect(notes[1].ux.priority).toEqual(2);
                expect(notes[2].ux.priority).toEqual(3);
                // maybe: convert timestamp to time since unix epoch
            };

            var error = function(error) {};
            var failTest = function(error) {
				expect(error).toBeUndefined();
            };

            notesModel.list()
            .then(test, error)
            .catch(failTest);

            httpBackend.flush();

        });


    });

	describe('get', function() {

		xit('gets a note', function() {
                
            // test that the request is passed the note's id using a spy

            spyOn(Restangular, 'one').and.callThrough();

			var test = function(notes) {
                expect(Restangular.one).toHaveBeenCalledWith('notes');
				//expect(notes.text).toEqual('note test text');
                // test ux is added
                // test result is wrapped in modifiedResult
			};

			var error = function(error) {};

			var failTest = function(error) {
				expect(error).toBeUndefined();
			};

			httpBackend.when('GET', '/notes?x=y').respond([{text: 'note test text'}, {text: 'two'}, {text:'three'}]);

			// promise returned by get()
			// test is called on result
			// error is called on reject
			// catch can be used in place of passing
			// an error function to then
			// if using the old method of creating a promise,
			// I can pass a notify function as the 3rd arg
			// to then.
			notesModel.get()
				.then(test, error)
				.catch(failTest);

			httpBackend.flush();
		});
	});
});
