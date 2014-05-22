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

	// Translate.settings.get(function(settings) {
	// 	if (!settings.languages) settings.languages = [];
	// 	settings.save();
	// })

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


		// Translate.settings(function(err,data) {
		// 		callback(data.settings.languages);
		// })
		//callback();
		//instead of passing language we will query mongo 
		//for a list of all the language and pass it to the routes.
		// Translate.settings.get(function(settings) {
		// 	callback(settings.languages);
		// });
	};

	//We enable routing. By default the Package Object is passed to the routes
	Translate.routes(app, auth, database);
});
