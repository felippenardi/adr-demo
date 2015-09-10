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

    var service = this;

    service.list = function() {
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


    service.add = function() {};
    service.remove = function() {};
    service.addBlock = function() {};
    service.removeBlock = function() {};

}

}())
