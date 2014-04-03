'use strict';

//Tokens service used for translate REST endpoint
angular.module('mean.system').factory('Translate', ['$resource',
	function($resource) {
		return $resource('translate/all/langs');
	}
]);