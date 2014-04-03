'use strict';


angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('mean-translate some state', {
				url: '/mean-translate/example',
				templateUrl: 'mean-translate/views/index.html'
			})
	}
])