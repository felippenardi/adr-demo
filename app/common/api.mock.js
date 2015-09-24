angular.module('adr.module')

.run(['$httpBackend', function($httpBackend) {

	var garyCases = [

	{
		id: 1,
		name: 'Case One',
		organization_id: 1
	},
	{
		id: 2,
		name: 'Case Two',
		organization_id: 2
	},
	{
		id: 3,
		name: 'Case Three',
		organization_id: 1
	}
	];
	
	var garyOrganizations = [
	{
		id: 1,
		name: 'Organization One Name'
	},
	{
		id: 2,
		name: 'Organization Two Name'
	}
	];
	
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
            category_id: 1,
            text: 'note 1 text here',
            party_id: 2,
	    priority: 1
    	},   
        {
            id: 2,
            created: Date.now(),
            category_id: 3,
            text: 'note 2 text here',
            party_id: 2,
            priority: 2
        }
    ];

    var linkings = [
        {
            id: 1,
            name: 'linking one name',
            notes: [1, 2]
        },
        {
            id: 2,
            name: 'linking two name',
            notes: [1, 2]
        },
        {
            id: 3,
            name: 'linking three name',
            notes: [1, 2]
        }

    ];

    /**** cases ****/
	$httpBackend.whenGET(/\/api\/mediators\/1\/cases/).respond(200, garyCases);

    /**** organizations ****/
	    $httpBackend.whenGET(/\/api\/mediators\/1\/organizations/).respond(200, garyOrganizations);

    /**** categories ****/
    $httpBackend.whenGET(/\/api\/categories/).respond(200, categories);

    /**** parties *****/
    $httpBackend.whenGET(/\/api\/parties/).respond(200, parties);

    /**** notes ****/
    $httpBackend.whenGET(/\/api\/cases\/1\/notes/).respond(200, notes);
    $httpBackend.whenPOST(/\/api\/notes/).respond(function(method, url, data) {
	    dataObj = JSON.parse(data);
	    var id = Math.floor((Math.random() * 1000000) + 1);
	    var note = {
		    id: id,
		    category_id: dataObj.category_id,
		    text: dataObj.text,
		    party_id: dataObj.party_id,
		    created: dataObj.created
	    };
	    return [201, note, {}];
    });

    /**** linkings ****/
    $httpBackend.whenGET(/\/api\/linkings/).respond(200, linkings);

    $httpBackend.whenGET(isTemplate).passThrough();

    var isTemplate = function(url) {
        return (url.indexOf('.html') != -1);
    };

}]);
