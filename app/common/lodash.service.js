/* lodash.service.js */

(function() {
    // by wrapping this factory in a function 
	var module = angular.module('lodash.service', []);

	module.service('_', function($window) {
        // I was trying to remove the lodash from the global scope, but it broke Restangular
		//var _ = $window._;
		//delete($window._);

		/*
		 *
		 * Custom Lodash methods follow.
		 *
		 */

		return (_);
	});
}());
