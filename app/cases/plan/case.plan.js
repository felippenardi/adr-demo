angular.module('case.plan', ['ui.router'])

.config(function($stateProvider) {

    $stateProvider
/*
    .state('dash.cases.plan.parties', {
        url: 'parties',
        templateUrl: 'app/cases/plan/parties/case.plan.parties.html'
    })

   */

    .state('dash.plan', {
        url: 'plan',
        //templateUrl: 'app/cases/plan/case.plan.html'
        templateUrl: 'app/cases/plan/parties/case.plan.parties.html'
    })


    
})
