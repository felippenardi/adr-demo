/* categories.model.js */

(function() {

angular.module('categories.model', ['restangular'])
    .service('categoriesModel', CategoriesModel);

/* 
 * @class CategoriesModel
 * @classdesc Model for category data
 * @ngInject 
 */
function CategoriesModel(Restangular, $q) {

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

}

}())
