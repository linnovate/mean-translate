'use strict';

angular.module('mean').controller('MeanTranslateController', ['$scope', 'Global', 'Translate','$http',
	function($scope, Global, Translate, $http) {
		$scope.global = Global;
		$scope.meanTranslate = {name:'mean-translate'};

		$scope.addLanguage = function() {
			Translate.addLanguage($scope.newLanguage, function(data){
				$scope.global.langs = data;
				data.forEach(function(lang) {
					if (lang['default']) {
						$scope.global.defaultLanguage = lang;
					}
				});
				$scope.newLanguage = '';
			});
		}

		$scope.setDefaultLanguage = function() {
			Translate.setDefault($scope.global.lang, function(data){});
		}
	}
]);