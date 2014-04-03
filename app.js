'use strict';
/*
 * Defining the Package
 */

var Module = require("meanio").Module;

var Translate = new Module("mean-translate");

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */

Translate.register(function(app, auth, database) {

	// Translate.settings.get(function(settings) {
	// 	if (!settings.languages) settings.languages = [];
	// 	settings.save();
	// })


	Translate.all = function(callback) {
		callback([{
			'identifier': 'en'
		}, {
			'identifier': 'sp'
		}])
		//instead of passing language we will query mongo 
		//for a list of all the language and pass it to the routes.
		// Translate.settings.get(function(settings) {
		// 	callback(settings.languages);
		// });
	};

	//We enable routing. By default the Package Object is passed to the routes
	Translate.routes(app, auth, database);

	//We are adding a link to the main menu for all authenticated users
	Translate.menus.add({
		title: "translate example page",
		link: "translate example page",
		roles: ["authenticated"],
		menu: "main"
	})
});