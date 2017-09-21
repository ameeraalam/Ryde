var Controller = require('./Controller.js');

module.exports = function() {
	'use strict';

	/* Routing dependencies */
	var express = require('express');
	var bodyParser = require('body-parser');
	var Controller = require('./Controller.js');

	const CONTROLLER = new Controller();
	const ROOT = './';

	/* Express object created */
	var app = express();

	/* Middleware bindings */
	app.set('views', './views');
	app.set('view engine', 'pug');
	app.use(express.static(ROOT));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(function(req, res, next) {
		console.log(req.method + ' request for: ' + req.url);
		next(); // next without parameter simply invokes the next route in the file
	});

	/* Routings */

	app.get('/', function(req, res) { CONTROLLER.index(req, res); });

	app.get('*', function(req, res) { CONTROLLER.err(req, res); });

	app.listen(3000, CONTROLLER.intro());

}
