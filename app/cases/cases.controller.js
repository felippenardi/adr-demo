(function() {

angular.module('cases.module')

.controller('CasesCtrl', CasesCtrl)

/*
 * @class CaseCtrl
 * @classdesc Controller for case listing view
 * @ngInject
 */
function CasesCtrl(_, casesModel, organizationsModel) { 
	vm = this;
	vm.cases = casesModel.cases;
	casesModel.listByMediator(1).then(function() {
		vm.cases = casesModel.cases;
	});
	vm.organizations = organizationsModel.organizations;
	organizationsModel.listByMediator(1).then(function() {
		vm.organizations = organizationsModel.organizations;
	});;
};

}())
