describe('NoteModel', function() {

	var noteModel,
	httpBackend,
	Restangular,
	q;


	beforeEach(module('note.model'));
	
	beforeEach(inject(function(_noteModel_, _Restangular_, _$httpBackend_, $q) {
		noteModel = _noteModel_;
		Restangular = _Restangular_;
		httpBackend = _$httpBackend_;
		q = $q;

	}));
       

	describe('get', function() {

		it('gets a note', function(done) {
                
            // test that the request is passed the note's id using a spy
            //spyOn(Restangular, 'one').and.callThrough();

			var test = function(notes) {
                //expect(Restangular.one).toHaveBeenCalledWith('bluenotes');
				expect(notes).toEqual({text: 'nt text'});
                // test ux is added
                // test result is wrapped in modifiedResult
			};

			var error = function(error) {};

			var failTest = function(error) {
				expect(error).toBeUndefined();
			};

			httpBackend.when('GET', '/notes?x=y').respond({text: 'note test text'});

			// promise returned by get()
			// test is called on result
			// error is called on reject
			// catch can be used in place of passing
			// an error function to then
			// if using the old method of creating a promise,
			// I can pass a notify function as the 3rd arg
			// to then.
			noteModel.get()
				.then(test, error)
				.catch(failTest)
				.finally(done());


			httpBackend.flush();
		});
	});
});
