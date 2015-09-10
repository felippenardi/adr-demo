/* columns.model.js */

angular.module('columns.model', [])

.service('columnsModel', function() {

    var service = this;
    var columns = [];

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

}); // .service
