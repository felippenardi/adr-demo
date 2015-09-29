(function() {

angular.module('notes.module')
.filter('linkMode', LinkMode);

/*
 * @class LinkMode
 * @classdesc returns notes in link mode
 * @ngInject
 */
function LinkMode(_) {
    return function(input) {
        return _.where(input, { 'ux': { 'link_mode': true } });
    };
};

}())
