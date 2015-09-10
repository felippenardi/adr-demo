angular.module('restangular.service', ['restangular'])

.service('Restangular', function(Restangular) {
    Restangular.setBaseUrl('http://localhost:8000/api');
    return (Restangular);
});
