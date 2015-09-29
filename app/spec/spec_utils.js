angular.module('spec.utils', [])

.service('specUtils', function() {

    var service = {
        generateId: generateId
    };
    return service;

    function generateId() {
        return Math.floor((Math.random() * 1000000) + 1);
    };

}); // specUtils
