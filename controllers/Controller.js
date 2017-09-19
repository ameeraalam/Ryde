'use strict'

class Controller {

	constructor() {

	}

	intro() {
		console.log('Server is listening on port 3000...');
	}

	// serve index page
	index(req, res) {
		res.status(200).render('index');
	}

	// on 404 errors
	err(req, res) { res.status(200).render('404'); }

}

module.exports = Controller;
