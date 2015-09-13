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
    service.categories = [];

    service.list = function(caseId) {
        return $q(function(resolve, reject) {
            var base = Restangular.all('categories');
            base.getList()
            .then(function(result) {
                service.categories = result;
                resolve(result);
            });
        });
    };

    service.getHeading = function(categoryId) {

        heading = _.where(service.categories, { 'id': categoryId });
		heading = _.get(_.first(heading), 'name');
        /*
        heading = _.where(vm.data.categories, { 'id': contentId });
		heading = _.get(_.first(heading), 'name');
        */
        return heading;

    }

    service.getPriority = function(categoryId) {}

}

}())
