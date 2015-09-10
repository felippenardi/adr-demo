/* categories.model.js */

angular.module('categories.model', ['restangular'])

.service('categoriesModel', function(Restangular, $q) {

    var service = this;

    service.list = function(caseId) {
        return $q(function(resolve, reject) {
            var base = Restangular.all('categories');
            base.getList()
            .then(function(result) {
                resolve(result);
            });
        });
    };

    service.getPriority = function(categoryId) {}

});// .service
