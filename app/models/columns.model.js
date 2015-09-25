/* columns.model.js */

(function() {

angular.module('columns.model', [])
    .service('columnsModel', ColumnsModel); // .service

/*
 * @class ColumnsModel
 * @classdesc Model for column data
 * @ngInject
 */
function ColumnsModel() {

    var service = {
        columns: [
            {
                heading: 'issues',
                blocks: [
                    {
                        heading: 'issues',
                        contents: { type: 'category', id: 1 }
                    }

                ]
            }
        ],
        list: list,
        add: add,
        remove: remove,
        addBlock: addBlock,
        removeBlock: removeBlock,
        categoriesHACK: [
            { id: 6, name: 'misc' },
            { id: 5, name: 'interests' },
            { id: 4, name: 'principles' },
            { id: 3, name: 'facts' },
            { id: 2, name: 'proposals' }
        ]
    };

    return service;

    function list() {
        /*
        return [
            {
                heading: 'issues',
                blocks: [
                    {
                        heading: 'issues',
                        contents: { type: 'category', id: 1 }
                    }

                ]
            }
        ];
       */
        return service.columns;
    };


    function add(position) {
        var cat = service.categoriesHACK.pop();
        var block = { 
            heading: cat.name, 
            contents: { 
                type: 'category', 
                id: cat.id 
            } 
        };
        var col = {
            heading: cat.name,
            blocks: [block]
        };

		service.columns.splice(position, 0, col);
    };
    function remove() {};
    function addBlock() {};
    function removeBlock() {};
}

}())
