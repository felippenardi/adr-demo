/* linkings.model.js */

(function() {

angular.module('linkings.model', ['restangular'])
    .service('linkingsModel', LinkingsModel);

/*
 * @class LinkingsModel
 * @classdesc Model for linkings data
 * @ngInject
 */
function LinkingsModel(Restangular, $q) {

    var service = {
        linkings: [],
        list: list,
        add: add,
        update: update    
    };

    return service;

    function list(caseId) {
        return $q(function(resolve, reject) {
            var base = Restangular.all('linkings');
            base.getList()
            .then(function(result) {
                service.linkings = result;
                resolve(service.linkings);
            });
        });
    };

    function add() {};
    function update() {};

}

}())
