angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('languages', {
				url: '/admin/languages',
				templateUrl: 'mean-translate/views/index.html',
			});
	}
])