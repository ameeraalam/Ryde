'use strict'

var Routes = require('./controllers/Routing.js')

function main() {
	Routes.setRoutes();
}

if (!module.parent) {
	main();
}
