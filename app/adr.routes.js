angular.module('adr.module')

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/dash");
	
	$stateProvider

    /* BROKEN: for some reason I cannot get adr.dash to work */
    .state('adr', {
        url: '',
        abstract: true
    })

});
