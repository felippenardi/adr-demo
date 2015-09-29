describe('linkingsModel', function() {
    beforeEach(function() {
        module('linkings.model');
        module('spec.utils');
    });

    var linkingsModel,
        utils,
        httpBackend,
        Restangular,
        q;

    beforeEach(inject(function(_linkingsModel_, _specUtils_, _$httpBackend_, _Restangular_, $q) {
        linkingsModel = _linkingsModel_;
        utils = _specUtils_
        httpBackend = _$httpBackend_;
        Restangular = _Restangular_;
        q = $q;
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
 
    describe('create', function() {

        beforeEach(function() {
            httpBackend.whenGET('/cases/1/linkings').respond([
                { 
                id: 1,
                name: 'one',
                notes: [1,2,3]
            },
            {
                id: 2,
                name: 'two',
                notes: [4,5,6]
            },
            {
                id: 3,
                name: 'three',
                notes: [7,8,9]
            }
            ]);
            httpBackend.whenPOST('/linkings', undefined).respond(function(method, url, data, headers) {
                dataObj = JSON.parse(data);
                respData = {
                    id: utils.generateId(),
                    name: dataObj.name,
                    notes: dataObj.notes
                };
                return [201, JSON.stringify(respData)];
            }); // whenPOST            
        }); // beforeEach for create

        it('should create a linking', createShouldStoreTheLinking);

    }); // describe create

    function createShouldStoreTheLinking() {

        var linking = {
            name: 'new',
            notes: [1,2,3]
        };
        
        var test = function(resp) {
            expect(linkingsModel.linkings.length).toEqual(4);
            var storedLinking = linkingsModel.linkings[3];
            expect(storedLinking.name).toEqual('new');
            expect(storedLinking.notes).toEqual([1,2,3]);
        };

        linkingsModel.list(1).then(function(resp) { 
            return linkingsModel.create(linking);
        }).then(test);

        httpBackend.flush();

    } // createShouldStoreTheLinking

}); // describe linkingsModel
