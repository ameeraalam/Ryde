"use strict";

let AbstractModel = require("./AbstractModel.js");

// this class is responsible for the Users collection in the Ryde mongodb database
class Rydes extends AbstractModel {
	constructor() {
		super();
		// this is the collection that this model will deal with
		this.collection = "Rydes";
	}
}

module.exports = Rydes;
