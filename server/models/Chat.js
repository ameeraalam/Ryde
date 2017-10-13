"use strict"; // to enable ES6 syntax

let MongoClient = require("mongodb").MongoClient;

// This file will contain the blue print for the chat model, which will be used to
// interact with the MongoDB collection called Chat, which holds all the chat messages of individual rides.

class Chat {

	constructor() {
		// this variable will hold the mongodb database address which is used to 
		// connect to the mongodb server's Ryde database
		this.db = "mongodb://localhost:27017/Ryde";
		this.collection = "Chat";
	}

	insert(rydeId, successCallBack, failureCallBack) {


	}

	update(rydeId, successCallBack, failureCallBack) {


		
	}


	query(rydeId, successCallBack, failureCallBack) {



	}

	remove(rydeId, successCallBack, failureCallBack) {



	}

}

module.exports = Chat;