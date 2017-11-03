<<<<<<< HEAD
"use strict"; // to enable ES6 syntax

let AbstractModel = require("./AbstractModel");

// This file will contain the blue print for the Ryde model

class Rydes extends AbstractModel {
	constructor() {
		super();
		// This is the collection that this model will deal with
=======
"use strict";

let AbstractModel = require("./AbstractModel.js");

// this class is responsible for the Users collection in the Ryde mongodb database
class Rydes extends AbstractModel {
	constructor() {
		super();
		// this is the collection that this model will deal with
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
		this.collection = "Rydes";
	}
}

<<<<<<< HEAD
module.exports = Rydes;
=======
module.exports = Rydes;
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
