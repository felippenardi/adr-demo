(function() {

angular.module('dash.main', ['ui.router', 'cases.main', 'case.plan'])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('dash.cases', {
        url: 'cases',
        templateUrl: 'app/cases/cases.main.html',
        controller: 'CasesCtrl as cases'
    })
})

.controller('DashCtrl', [DashCtrl])

/*
 * @class DashCtrl
 * @classdesc Controller for dash view
 * @ngInject
 */
function DashCtrl() {};

}())
