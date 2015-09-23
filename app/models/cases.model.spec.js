describe('casesModel', function() {

	var casesModel,
	httpBackend,
	Restangular,
	q;

	beforeEach(module('cases.model'));

	beforeEach(inject(function(_casesModel_, _$httpBackend_, _Restangular_, $q) {
		casesModel = _casesModel_;
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


	describe('listByMediator', function() {
		it('should get all cases for supplied mediator', listByMediatorShouldGetAllCasesForSuppliedMediator);
	}); // describe listByMediator

	function listByMediatorShouldGetAllCasesForSuppliedMediator() {

		httpBackend.whenGET('/mediators/1/cases').respond([
		{
			id: 1,
			name: 'case 1',
			organization: 1
		},
		{
			id: 2,
			name: 'case 2',
			organization: 1
		},
		{
			id: 3,
			name: 'case 3',
			organization: 2
		}
		]);

		function test(data) {

			expect(casesModel.cases.length).toEqual(3);

			var c = casesModel.cases[0];
			expect(c.name).toEqual('case 1');

			c = casesModel.cases[1];
			expect(c.name).toEqual('case 2');

			c = casesModel.cases[2];
			expect(c.name).toEqual('case 3');
		};

		casesModel.listByMediator(1).then(test);
		httpBackend.flush();

	};
}); // describe casesModel
