/* columns.model.js */

angular.module('column.model', ['restangular'])

.service('columnModel', function(Restangular, $q) {

    var service = this;
    var columns = [];

    service.list = function() {};
    service.add = function() {};
    service.remove = function() {};
    service.addBlock = function() {};
    service.removeBlock = function() {};

} // .service
