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
                resolve(result);
            });
        });
    };

    function add() {};
    function update() {};

}

}())
