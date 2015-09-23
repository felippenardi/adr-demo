describe('organizationsModel', function() {

	var organizationsModel,
	httpBackend,
	Restangular,
	q;
 
	beforeEach(module('organizations.model'));

	beforeEach(inject(function(_organizationsModel_, _Restangular_, _$httpBackend_, $q) {
		organizationsModel = _organizationsModel_;
		Restangular = _Restangular_;
		httpBackend = _$httpBackend_;
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
		it('should get organizations for the supplied mediator', listByMediatorShouldGetOrganizationsForTheSuppliedMediator);
	});

	function listByMediatorShouldGetOrganizationsForTheSuppliedMediator() {
		httpBackend.whenGET('/mediators/1/organizations').respond([
		{
			id: 1,
			name: 'org one'
		},
		{
			id: 2,
			name: 'org two'
		},
		{
			id: 3,
			name: 'org three'
		}
		]);

		function test(data) {
			expect(organizationsModel.organizations.length).toEqual(3);

			var organization = organizationsModel.organizations[0];
			expect(organization.name).toEqual('org one');

			organization = organizationsModel.organizations[1];
			expect(organization.name).toEqual('org two');

			organization = organizationsModel.organizations[2];
			expect(organization.name).toEqual('org three');
		}

		organizationsModel.listByMediator(1).then(test)

		httpBackend.flush();
	};

});
