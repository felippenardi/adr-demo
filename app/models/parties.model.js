/* parties.model.js */

(function() {

angular.module('parties.model', ['restangular'])
    .service('partiesModel', PartiesModel)

/*
 * @class PartiesModel
 * @classdesc Model for party data
 * @ngInject
 */
function PartiesModel(Restangular, $q) {

    var service = { list: list };

    return service;

    function list(caseId) {
        return $q(function(resolve, reject) {
            var base = Restangular.all('parties');
            base.getList()
            .then(function(result) {
                resolve(result);
            });
        });
    };

    service.setActive = function() {};
    service.getActive = function() {};

}; // .service

}())
