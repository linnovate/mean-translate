'use strict';

//Tokens service used for translate REST endpoint
angular.module('mean.system').factory('Translate', ['$http',
	function($http) {
		var getLangs = function(callback){
			$http.get('translate/all/langs').success(function(data){
				callback(data);

			});
		};
        var addLanguage = function(newLanguage, callback) {
        	$http.put('/languages/add?lang='+ newLanguage).success(function(data){
				callback(data);
			});
        };
        var setDefault = function(newDefault, callback) {
            $http.put('/languages/setDefault?lang='+ newDefault).success(function(data){
				callback(data);
			});
        };
        return {
        	getLangs: getLangs,
            addLanguage: addLanguage,
            setDefault: setDefault
        };
    }

]);