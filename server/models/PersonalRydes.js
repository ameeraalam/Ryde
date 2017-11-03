<<<<<<< HEAD
"use strict" // to enable ES6 syntax

let AbstractModel = require("./AbstractModel.js");

// This file will contain the blue print for the PersonalRydes model

class PersonalRydes extends AbstractModel {
	constructor() {
		super();
		// This is the collection that this model will deal with
		this.collection = "PersonalRydes"
	}
}

module.exports = PersonalRydes;
=======
"use strict";

let AbstractModel = require("./AbstractModel.js");

// this class is responsible for the Users collection in the Ryde mongodb database
class PersonalRydes extends AbstractModel {
	constructor() {
		super();
		// this is the collection that this model will deal with
		this.collection = "PersonalRydes";
	}
}

module.exports = PersonalRydes;
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
