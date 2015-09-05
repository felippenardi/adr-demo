/* categories.model.js */

angular.module('category.model', ['restangular'])

.service('categoryModel', function(Restangular, $q) {

    var service = this;
    var categories = []

    service.list = function(caseId) {};

    service.getPriority = function(categoryId) {}

}// .service
