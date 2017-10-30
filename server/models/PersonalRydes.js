"use strict" // to enable ES6 syntax

let AbstractModel = require("./AbstractModel.js")

// This file will contain the blue print for the PersonalRydes model

class PersonalRydes extends AbstractModel {
	constructor() {
		super();
		// This is the collection that this model will deal with
		this.collection = "PersonalRydes"
	}
}

module.exports = PersonalRydes;