/* parties.model.js */

angular.module('parties.model', ['restangular'])

.service('partiesModel', function(Restangular, $q) {

    var service = this;

    service.list = function(caseId) {
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

}); // .service
