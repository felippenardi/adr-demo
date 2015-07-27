/* common.factories.js */

/* 
 * inspired by
 *
 * http://www.bennadel.com/blog/2720-creating-and-extending-a-lodash-underscore-service-in-angularjs.htm
 */

var module = angular.module('common.factories', []);

module.factory('_', function($window) {
	var _ = $window._;
	delete($window._);

	/*
	 *
	 * Custom Lodash methods follow.
	 *
	 */

	return(_);
});
