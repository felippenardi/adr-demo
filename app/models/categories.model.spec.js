xdescribe('categoriesModel', function() {
    var categoriesModel, 
    httpBackend,
    Restangular,
    q;

    var testCategories = [];

    beforeEach(module('categories.model'));

    beforeEach(inject(function(_categoriesModel_, _Restangular_, _$httpBackend_, $q) {
        categoriesModel = _categoriesModel_;
        Restangular = _Restangular_;
		httpBackend = _$httpBackend_;
		q = $q;

        httpBackend.when('GET', '/categories').respond(testCategories);

    }));

    describe('getHeading', function() {

        it('should get the heading of the category identified by the id passed', function() { 

	    // this obviously won't work since the categories is not accesible outside the sevice implementation
		// How can I use a spy ?
            categoriesModel.categories.push({ id: 1, name: 'correct heading'});
            var heading = categoriesModel.getHeading(1);
            expect(heading).toEqual('correct heading');
        });
    });

});
