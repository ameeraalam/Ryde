"use strict";

var Controller = require('./Controller.js');

module.exports = function() {
	/* Routing dependencies */
	var express = require('express');
	var bodyParser = require('body-parser');
	var Controller = require('./Controller.js');

	const CONTROLLER = new Controller();
	const ROOT = './';

	/* Express object created */
	var app = express();

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

	app.post("/login", function(req, res) { CONTROLLER.login(req, res); });

	app.post("/register", function(req, res) { CONTROLLER.register(req, res); });

	app.post("/emailCheck", function(req, res) { CONTROLLER.emailCheck(req, res); });

	app.listen(3000, CONTROLLER.intro());

}
