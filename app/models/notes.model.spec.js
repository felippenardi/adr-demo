describe('notesModel', function() {

	var notesModel,
    utils,
	timestamp,
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

	var storedNotes = [
		{
		id: 1,
		created: '01-19-2015:00:00:01',
		category_id: 1,
		text: 'note 1',
		party_id: 1,
		ux: {
			priority: 1,
			link_mode: false
		}
	}, {
		id: 2,
		created: '01-19-2015:00:00:02',
		category_id: 2,
		text: 'note 2',
		party_id: 1,
		ux: {
			priority: 2,
			link_mode: false
		}

	}, {
		id: 3,
		created: '01-19-2015:00:00:03',
		category_id: 3,
		text: 'note 3',
		party_id: 1,
		ux: {
			priority: 3,
			link_mode: false
		}

	}];

	beforeEach(function() {
        module('notes.model')
        module('spec.utils')
    });

	// mocks
	beforeEach(module(function($provide) {
		$provide.value('timestamp', 1442870762333);
	}));
	

	beforeEach(inject(function(_notesModel_, _specUtils_, _timestamp_, _Restangular_, _$httpBackend_, $q) {
		notesModel = _notesModel_;
        utils = _specUtils_;
		timestamp = _timestamp_;
		Restangular = _Restangular_;
		httpBackend = _$httpBackend_;
		q = $q;

		httpBackend.when('GET', '/cases/1/notes').respond(testNotes);
	}));

	afterEach(function() {
		if(httpBackend) {
			httpBackend.verifyNoOutstandingExpectation
		}
	});

	afterEach(function() {
		if(httpBackend) {
			httpBackend.verifyNoOutstandingRequest
		}
	});
       
	describe('list', function() {

		it('should make request for all case notes', listShouldMakeRequestForAllCaseNotes)
		it('should get all notes add ux object and store them', listShouldGetAllNotesAddUXObjectAndStoreThem);
		it('should get notes from cache if available', listShouldGetNotesFromCacheIfAvailable)

	});

	describe('get', function() {

		it('should get a note', getShouldGetANote);

	});

	describe('create', function() {

		it('should post a note to the server', createShouldPostANoteToTheServer);
		it('should add a timestamp to the note before posting', createShouldAddATimestampToTheNoteBeforePosting);
		it('should append ux to the response and cache the note', createShouldAppendUxToResponseAndCacheTheNote);
	});

	describe('turnOffLinkMode', function() {
		it('should set link_mode to false for each note', turnOffLinkModeShouldSetLinkModeToFalseForEachNote);
	});

    describe('getNotesInLinkModeSortedByPriorityAndThenByCreated', function() {
        it('should return all notes in link mode', getNotesInLinkModeSortedByPriorityAndThenByCreatedShouldReturnAllNotesInLinkMode);
    });;

	/******************************/
	/**** TEST IMPLEMENTATIONS ****/
	/******************************/

	var newNote = {
		category: 1,
		text: 'note text',
		party_id: 2,
	};

	var resp = {
		id: 1,
		category: 1,
		created: timestamp,
		text: 'note text',
		party_id: 2,
		priority: 1
	};

	resp = JSON.stringify(resp);

	/**** TEST notesModel.list() ****/

	function listShouldMakeRequestForAllCaseNotes() {

		httpBackend.when('GET', '/cases/33/notes').respond([]);
		httpBackend.when('GET', '/cases/66/notes').respond([]);
            	notesModel.list(33)
		httpBackend.expectGET('/cases/33/notes');
            	notesModel.list(66)
		httpBackend.expectGET('/cases/66/notes');
            	httpBackend.flush();

	};

	function listShouldGetAllNotesAddUXObjectAndStoreThem() {

		function test(notes) {
		    
		    var note = notesModel.notes[0];
		    expect(note.id).toEqual(1);
		    expect(note.ux.priority).toEqual(1);
		    expect(note.ux.link_mode).toEqual(false);

		    var note = notesModel.notes[1];
		    expect(note.id).toEqual(2);
		    expect(note.ux.priority).toEqual(2);
		    expect(note.ux.link_mode).toEqual(false);

		    var note = notesModel.notes[2];
		    expect(note.id).toEqual(3);
		    expect(note.ux.priority).toEqual(3);
		    expect(note.ux.link_mode).toEqual(false);
		};

            function error(error) { console.log('error', error) };

            var exceptionTest = function(e) {
		console.log('exception', e);
		expect(e).toBeUndefined();
            };

            notesModel.list(1)
            .then(test, error)
            .catch(exceptionTest);

            httpBackend.flush();

        }

	function listShouldGetNotesFromCacheIfAvailable() {
		// How do I test this?
		// httpBackend.flush() throws exception since the http request is never made
		// maybe I can catch the exception and pass if its thrown or fail otherwise
	};

	/**** TEST notesModel.get() ****/
	function getShouldGetANote() {
		notesModel.notes = storedNotes;
		var actual = notesModel.get(2);
		expect(actual.id).toEqual(2);
		actual = notesModel.get(3);
		expect(actual.id).toEqual(3);
	}

	function OLDgetShouldGetANote() {
                
            // test that the request is passed the note's id using a spy

            spyOn(Restangular, 'one').and.callThrough();

			function test(notes) {
                expect(Restangular.one).toHaveBeenCalledWith('notes');
				//expect(notes.text).toEqual('note test text');
                // test ux is added
                // test result is wrapped in modifiedResult
			};

			function error(error) {};

			var exceptionTest = function(error) {
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
				.catch(exceptionTest);

			httpBackend.flush();
		}

	/**** TEST notesModel.create() ****/

	function createShouldPostANoteToTheServer() {
		httpBackend.when('POST', '/notes', newNote).respond(201, resp);
		httpBackend.expectPOST('/notes', newNote);
		notesModel.create(newNote);
		httpBackend.flush();
	};

	function createShouldAddATimestampToTheNoteBeforePosting() {

		var expectedPayload = {

			category: 1,
			created: timestamp,
			text: 'note text',
			party_id: 2
		};

		httpBackend.expectPOST('/notes', expectedPayload);
		httpBackend.when('POST', '/notes', newNote).respond(201, resp);
		notesModel.create(newNote)
		httpBackend.flush();
	};

	function stubPromiseTest() {

		function test(note) {};

		function error(error) {};

		var exceptionTest = function(e) {
			expect(e).toBeUndefined();
		};

		httpBackend.when('POST', '/notes', newNote).respond(201, resp);
		notesModel.create(newNote)
		.then(test, error)
		.catch(exceptionTest);

		httpBackend.flush();

	};

	function createShouldAppendUxToResponseAndCacheTheNote() {
		// add one note to the cache
		var storedNote = utils.createStoredNote(1, 1, 'text', 1, timestamp, 1, false);
		notesModel.notes.push(storedNote);

		var note = utils.createRawNote(1, 'text', 1);

		// the note posted to the server should not contain the ux object
		var expectedPostData = utils.createNoteToPost(1, 'text', 1, timestamp);
		httpBackend.expectPOST('/notes', expectedPostData);

		function test(data) {
			var newNote = _.find(notesModel.notes, { 'id': 2 });
			expect(newNote.ux.link_mode).toEqual(false);
			expect(newNote.ux.priority).toEqual(1);
			expect(notesModel.notes.length).toEqual(2);
		};

		function error(error) {
			expect(true).toEqual(false);
		}
		
		// response will contain a note with id = 2
		httpBackend.whenPOST('/notes').respond(utils.createResponseNote(2, 1, 'text', 1, timestamp));
		notesModel.create(note)
		.then(test, error);

		httpBackend.flush();

	};

	/**** Test turnOffLinkMode ****/

	function turnOffLinkModeShouldSetLinkModeToFalseForEachNote() {
		var notes = [
			utils.createStoredNote(1, 1, 'text', 1, timestamp, 1, false), 
			utils.createStoredNote(1, 1, 'text', 1, timestamp, 1, true), 
			utils.createStoredNote(1, 1, 'text', 1, timestamp, 1, false), 
			utils.createStoredNote(1, 1, 'text', 1, timestamp, 1, true)
		];
		notesModel.notes = notes;

		notesModel.turnOffLinkMode();

		for (i=0; i<notesModel.notes.length; i++) {
			expect(notesModel.notes[i].ux.link_mode).toEqual(false);
		}
	};

    /**** Test getNotesInLinkMode ****/
    function getNotesInLinkModeSortedByPriorityAndThenByCreatedShouldReturnAllNotesInLinkMode() {
        notesModel.notes = [
            utils.createStoredNote(1, 1, 'text', 1, timestamp, 1, false),
            utils.createStoredNote(2, 1, 'text', 1, timestamp, 1, false),
            utils.createStoredNote(3, 1, 'text', 1, timestamp, 1, true),
            utils.createStoredNote(4, 1, 'text', 1, timestamp, 1, false),
            utils.createStoredNote(5, 1, 'text', 1, timestamp, 1, true)
        ];

        var result = notesModel.getNotesInLinkModeSortedByPriorityAndThenByCreated();

        expect(result[0].id).toEqual(3);
        expect(result[1].id).toEqual(5);
    };

}); // describe notesModel
