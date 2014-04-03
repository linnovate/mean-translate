'use strict';

angular.module('mean').controller('MeanTranslateController', ['$scope', 'Global',
	function($scope, Global, Translate) {
		$scope.global = Global;
		$scope.meanTranslate = {name:'mean-translate'};

	}
]);