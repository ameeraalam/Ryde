'use strict'

class Controller {

	constructor() {

	}

	intro() {
		console.log('Server is listening on port 3000...');
	}

	login(req, res) {
		res.sendStatus(200);
	}

}

module.exports = Controller;
