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
    
    var categories = [];

    var service = {
        list: list,
        getHeading: getHeading,
        getPriority: getPriority
    };

    return service;

    function list (caseId) {
        return $q(function(resolve, reject) {
            var base = Restangular.all('categories');
            base.getList()
            .then(function(result) {
                categories = result;
                resolve(result);
            });
        });
    };

    function getHeading(categoryId) {
	
	    console.log('categories', categories);

        var heading = _.where(categories, { 'id': categoryId });
	heading = _.get(_.first(heading), 'name');
        	
        return heading;

    }

    function getPriority(categoryId) {}

}

}())
