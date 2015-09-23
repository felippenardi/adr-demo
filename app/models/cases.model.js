(function() {

angular.module('cases.model', ['restangular'])
.service('casesModel', CasesModel);

/*
 * @class CasesModel
 * @classdesc Model for cases data
 * @ngInject
 */
function CasesModel(Restangular, $q) {

	var service = {
		cases: [],
		listByMediator: listByMediator
	};
	return service;

	function listByMediator(mediatorId) {
		return $q(function(resolve, reject) {
			if(service.cases.length > 0) {
				resolve(service.cases);
			} else {
				Restangular.one('mediators', mediatorId).all('cases').getList().then(function(data) {
				service.cases = data;
				resolve(service.cases);
				}); // then
			} // if else

		}) // return $q

	}; // listByService
}; // CasesModel

}())
