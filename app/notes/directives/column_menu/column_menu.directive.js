/* column_menu.directive.js */
(function() {

angular.module('notes.module')
.directive('adrNotesColumnMenu', ColumnMenuDirective);

function ColumnMenuDirective() {

    return {
        restrict: 'E',
        scope: {},
        bindToController: true,
        controllerAs: 'columnMenu',
        controller: ColumnMenuCtrl,
        templateUrl: 'app/notes/directives/column_menu/column_menu.directive.html'
    };
};

function ColumnMenuCtrl() {};
    vm = this;
}())
