describe('NotesModel', function() {

	var notesModel,
	httpBackend,
	Restangular,
	q;


	beforeEach(module('notes.model'));

	
	beforeEach(inject(function(_notesModel_, _Restangular_, _$httpBackend_, $q) {
		notesModel = _notesModel_;
		Restangular = _Restangular_;
		httpBackend = _$httpBackend_;
		q = $q;

	}));
       

	describe('get', function() {
		it('gets a note', function(done) {
			var test = function(notes) {
				expect(notes).toEqual({text: 'note test text'});
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
			notesModel.get()
				.then(test, error)
				.catch(failTest)
				.finally(done());

			httpBackend.flush();
		});
	});
});
