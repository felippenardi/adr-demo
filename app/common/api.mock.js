angular.module('adr.main')

.run(['$httpBackend', function($httpBackend) {

    var categories = [
        {
            id: 1,
            name: 'issues',
            priority: 1
        },
        {
            id: 2,
            name: 'offers',
            priority: 2
        },
        {
            id: 3,
            name: 'facts',
            priority: 3
        },
        {
            id: 4,
            name: 'misc',
            priority: 4
        }
    ];
        
    var parties = [
        { id: 0, short_name: '--', selected: true },
        { id: 1, short_name: 'GD', selected: false },
        { id: 2, short_name: 'BS', selected: false  },
        { id: 3, short_name: 'JJ', selected: false  }
    ];

    // Refactor notes
    var notes = [
        {
            id: 1,
            created: Date.now(),
            category: 1,
            text: 'note 1 text here',
            party_id: 2,
            priority: 1,
            selected: false,
            link_mode: false
        },   
        {
            id: 2,
            created: Date.now(),
            category: 3,
            text: 'note 2 text here',
            party_id: 2,
            priority: 2,
            selected: false,
            link_mode: false
        }
    ];

    var linkings = [
        {
            id: 1,
            name: 'linking one name',
            notes: [1, 2]
        }
    ];

    var columns = [];

    $httpBackend.whenGET(/\/api\/categories/).respond(200, categories);
    $httpBackend.whenGET(/\/api\/parties/).respond(200, parties);
    $httpBackend.whenGET(/\/api\/notes/).respond(200, notes);
    $httpBackend.whenGET(/\/api\/linkings/).respond(200, linkings);
    $httpBackend.whenGET(isTemplate).passThrough();

    var isTemplate = function(url) {
        return (url.indexOf('.html') != -1);
    };

}]);
