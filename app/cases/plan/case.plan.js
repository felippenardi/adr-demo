(function() {

angular.module('case.plan', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.when('/dash/cases/plan', '/dash/cases/plan/parties');

    $stateProvider

    .state('dash.plan', {
        url: '/cases/plan',
        templateUrl: 'app/cases/plan/case.plan.html'
        //templateUrl: 'app/cases/plan/parties/case.plan.parties.html'
    })

    .state('dash.plan.parties', {
        url: '/parties',
        templateUrl: 'app/cases/plan/parties/case.plan.parties.html'
    })

    .state('dash.plan.schedule', {
        url: '/schedule',
        templateUrl: 'app/cases/plan/schedule/case.plan.schedule.html'
    })

    .state('dash.plan.statements', {
        url: '/statements',
        templateUrl: 'app/cases/plan/statements/case.plan.statements.html'
    })

})

}())
