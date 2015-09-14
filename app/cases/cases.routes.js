angular.module('cases.module')

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('dash.cases', {
        url: '/cases',
        templateUrl: 'app/cases/cases.html',
        controller: 'CasesCtrl as cases'
    })
});
