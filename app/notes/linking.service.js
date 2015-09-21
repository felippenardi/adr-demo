/* linking.service.js */

(function() {

angular.module('notes.module')
	var service = { beginLinkMode: beginLinkMode };

	return service;

	var linkMode = false;

	function beginLinkMode() {};

	function endLinkMode() {
		linkMode = false;

		// loop through notes and set ux.link_mode to false;
	};

	function isLinkMode() {
		return linkMode;
	};

}())
