'use strict';
/*
 * Defining the Package
 */

var Module = require('meanio').Module;

var Translate = new Module('mean-translate');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */

Translate.register(function(app, auth, database) {

	Translate.settings(function(err, data) {
 		if (!data) {
 			Translate.languages = {
 				'list': [{
 					'identifier': 'en',
 					'default': true
 				}, {
 					'identifier': 'sp'
 				}]
 			};
 			Translate.settings(Translate.languages);
 		} else {
 			Translate.languages = data.settings;
 		} 
 	});
 

	Translate.all = function(callback) {
		callback(Translate.languages.list);
	};

	Translate.menus.add({
		title: 'Translate Administration',
		link: 'languages',
		roles: ['admin'],
		menu: 'main'
	});


	//We enable routing. By default the Package Object is passed to the routes
	Translate.routes(app, auth, database);
});