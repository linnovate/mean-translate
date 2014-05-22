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

					langs.forEach(function(lang) {
						if (lang['default']) {
							scope.global.defaultLanguage = lang.identifier;
						}
					});
				});
				scope.global.lang = location.pathname.split('/')[1];

				scope.$watch('global.lang', function(a, b) {

					Translate.query(function(langs) {
						scope.global.langs = langs;

						langs.forEach(function(lang) {
							if (lang['default']) {
								scope.global.defaultLanguage = lang.identifier;
							}
						});

						if (scope.global.lang && a !== b) {
							if (scope.global.lang === scope.global.defaultLanguage) {

								location.href = location.origin + '/' + location.hash;
							} else {
								location.href = location.origin + '/' + scope.global.lang + location.hash;
							}

						}

					});
				});
			}
		};
	}
]);
