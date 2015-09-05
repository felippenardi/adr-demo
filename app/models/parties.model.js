/* parties.model.js */

angular.module('party.model', ['restangular'])

.service('partyModel', function(Restangular, $q) {

    var service = this;
    var parties = [];

    service.list = function() {};
    service.setActive = function() {};
    service.getActive = function() {};

} // .service
