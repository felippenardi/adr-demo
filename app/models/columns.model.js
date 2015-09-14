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
        list: list,
        add: add,
        remove: remove,
        addBlock: addBlock,
        removeBlock: removeBlock
    };

    return service;

    function list() {
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
    };


    function add() {};
    function remove() {};
    function addBlock() {};
    function removeBlock() {};
}

}())
