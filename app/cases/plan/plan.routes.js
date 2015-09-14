(function() {

angular.module('plan.module')

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.when('/dash/cases/plan', '/dash/cases/plan/parties');

    $stateProvider

    .state('dash.plan', {
        url: '/cases/plan',
        templateUrl: 'app/cases/plan/plan.html'
    })

    .state('dash.plan.parties', {
        url: '/parties',
        templateUrl: 'app/cases/plan/parties/parties.html'
    })

    .state('dash.plan.schedule', {
        url: '/schedule',
        templateUrl: 'app/cases/plan/schedule/schedule.html'
    })

    .state('dash.plan.statements', {
        url: '/statements',
        templateUrl: 'app/cases/plan/statements/statements.html'
    })

})

}())
