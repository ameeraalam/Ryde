'use strict'

let bcrypt = require("bcrypt");
let Users = require("./../models/Users.js")


class Controller {

	constructor() {
		this.modelUsers = new Users();
	}

	intro() {
		console.log('Server is listening on port 3000...');
	}

	// contains the logic for the login feature of the app
	login(req, res) {
		res.sendStatus(200);
	}

	// contains the logic for the register feature of the app
	register(req, res) {

		console.log(req.body);

		res.sendStatus(200);

	}
}

module.exports = Controller;
