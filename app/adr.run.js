angular.module('adr.module')

.run(function(Restangular) {
    Restangular.setBaseUrl('http://localhost:8000/api');
})
