(function() {

angular.module('organizations.model', ['restangular'])
.service('organizationsModel', OrganizationsModel);

/*
 * @class OrganizationsModel
 * @classdesc Model for organizations data
 * @ngInject
 */
function OrganizationsModel(Restangular, $q) {
	var service = { 
		organizations: [],
		listByMediator: listByMediator
	}

	return service;

	function listByMediator(mediatorId) {
		return $q(function(resolve, reject) {
			if(service.organizations.length > 0) {
				resolve(service.organizations);
			} else {
				Restangular.one('mediators', mediatorId).all('organizations').getList().then(function(data) {
					service.organizations = data;
					resolve(service.organizations);
				}); // then
			}; // if else
		}); // return $q
	}; // list
}; // service

}())
