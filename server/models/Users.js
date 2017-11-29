<<<<<<< HEAD
"use strict";

let AbstractModel = require("./AbstractModel.js");

// this class is responsible for the Users collection in the Ryde mongodb database
class Users extends AbstractModel {
	constructor() {
		super();
		// this is the collection that this model will deal with
		this.collection = "Users";
	}
}

=======
"use strict";

let AbstractModel = require("./AbstractModel.js");

// this class is responsible for the Users collection in the Ryde mongodb database
class Users extends AbstractModel {
	constructor() {
		super();
		// this is the collection that this model will deal with
		this.collection = "Users";
	}
}

>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
module.exports = Users;