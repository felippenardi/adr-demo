(function() {

angular.module('adr.module', [
    /* Angular Modules */
    'ngMockE2E',
    'ngAnimate',

    /* Vendor Modules */
    'ui.router', 
    'restangular',

    /* Features */
    'dash.module', 
    'session.module', 
    'cases.module',
    'notes.module',
    'plan.module'
])

}())
