'use strict';

angular.module('mean.system').directive('meanTranslate', ['Global', '$http', 'Translate',
	function(Global, $http, Translate) {
		return {
			restrict: 'A',
			templateUrl: 'mean-translate/views/translate.html',
			scope: {},
			replace: true,
			link: function(scope, elem, attrs) {
				scope.global = Global;
				Translate.query(function(langs) {
					scope.global.langs = langs;
				});
				scope.global.lang = location.pathname.split('/')[1];

				scope.$watch('global.lang', function(a, b) {
					if (scope.global.lang && a !== b) {
						location.href = location.origin + '/' + scope.global.lang + location.hash;
					}
				});
			}
		};
	}
]);