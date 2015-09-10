/* linkings.model.js */

angular.module('linkings.model', ['restangular'])

.service('linkingsModel', function(Restangular, $q) {

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

});// .service
