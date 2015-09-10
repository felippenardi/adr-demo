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

    var service = this;

    service.list = function(caseId) {
        return $q(function(resolve, reject) {
            var base = Restangular.all('linkings');
            base.getList()
            .then(function(result) {
                resolve(result);
            });
        });
    };

    service.add = function() {};
    service.update = function() {};

}

}())
