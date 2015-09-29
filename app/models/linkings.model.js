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
        create: create,
        update: update    
    };

    return service;

    function list(caseId) {
        return $q(function(resolve, reject) {
            var base = Restangular.one('cases', caseId).all('linkings');
            base.getList()
            .then(function(result) {
                service.linkings = result;
                resolve(service.linkings);
            });
        });
    };

    function create(linking) {
        return $q(function(resolve, reject) {
            Restangular.all('linkings').post(linking)
            .then(function(response) {
                service.linkings.push(response);
                resolve(service.linkings); 
            }); // then
        }); // return
    };
    function update() {};

}

}())
