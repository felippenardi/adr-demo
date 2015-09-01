/* common.factories.js */

/* 
 * inspired by
 *
 * http://www.bennadel.com/blog/2720-creating-and-extending-a-lodash-underscore-service-in-angularjs.htm
 */


/* 
* NOTE: I'm using the immediately-invoked function expression (IIFE pronounced iffy) design pattern.
*
* The outer parenthesis are a JS syntax short for function().  Its wrapping my function in another an
* anonymous function to protect the global scope.
*
* This prevents var module for overwriting another variable named module on the global scope.
* I could have just replaced var module with var name where name is unique to the entire application.
* This would however violates encapsulation because it requires knowledge of scope outside the function.
*
* Although 99% of tuts and examples on the web don't use IIFE, its a recommended practice.  Most tuts are simple enough that var collisions are unlikely so they are coded as succinctly as possible.
* */

(function() {
    // by wrapping this factory in a function 
	var module = angular.module('common.factories', []);

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
