//angular.module('api.backendless', ['adr.main', 'ngMockE2E'])
angular.module('adr.main')

.run(['$httpBackend', function($httpBackend) {

    var categories = [];
    var parties = [];
    var notes = [{text: 'note one text here'}, {text: 'note two text here' }];
    var linkings = [];
    var columns = [];

    $httpBackend.whenGET(/\/api\/notes/).respond(200, notes);
    $httpBackend.whenGET(isTemplate).passThrough();

    var isTemplate = function(url) {
        return (url.indexOf('.html') === -1);
    };

}]);
