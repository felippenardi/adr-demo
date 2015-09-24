/* linkings_selector.directive.js */
(function() {

angular.module('session.module')
.directive('adrSessionLinkingsSelector', LinkingsSelectorDirective);

/*
 * @class LinkingsSelectorDirective
 * @classdesc diretive for selecting linkings
 * @ngInject
 */
function LinkingsSelectorDirective() {
    return {
        restrict: 'E',
        scope: {},
        bindToController: true,
        controllerAs: 'linkingsSelector',
        controller: LinkingsSelectorCtrl,
        templateUrl: 'app/session/directives/linkings_selector/linkings_selector.directive.html'
    };
};

/*
 * @class LinkingsSelectorCtrl
 * @classdesc controller for the linkingsSelectorDirective
 * @ngInject
 */
function LinkingsSelectorCtrl(linkingsModel) {
    vm = this;
    vm.existing = linkingsModel.linkings;
    linkingsModel.list(1).then(function() { vm.existing = linkingsModel.linkings; });
    vm.selected = [];
};

}())
