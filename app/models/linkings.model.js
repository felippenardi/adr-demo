/* linkings.model.js */

angular.module('linking.model', ['restangular'])

.service('linkingModel', function(Restangular, $q) {

    var service = this;
    var linkings = [];

    service.list = function() {};
    service.add = function() {};
    service.update = function() {};

}// .service
