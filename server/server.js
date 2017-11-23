'use strict'

var Routes = require('./controllers/routing.js')

function main() {
	Routes.setRoutes();
}

if (!module.parent) {
	main();
}
