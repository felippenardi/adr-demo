angular.module('notes.module')

.controller('ModalCtrl', ModalCtrl)

/*
 * @class ModalCtrl
 * @classdesc Controller for the create new linking modal
 * @ngInject
 */
function ModalCtrl($modalInstance, defaultName, existingLinkings) {
	vm = this;
	vm.newLinkingName = defaultName;
	vm.existingLinkings = existingLinkings;
	vm.isANewLinking = true;

	vm.toggleIsANewLinking = function() {
		vm.isANewLinking = !vm.isANewLinking;
	};	

	vm.saveLinking = function() {
		var res = {
			linkingName: vm.newLinkingName,
			isNew: true
		};
		$modalInstance.close(res);
	};

    vm.cancel = function() {
        $modalInstance.close();
    };
}
