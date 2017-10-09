"use strict";

let MongoClient = require("mongodb").MongoClient;

/*	
	NOTE** - The reason that the successCallBack and failureCallBack will work and can
	successfully access the variables is because the class Users has a composition relationship
	with the Controller, this means that because of lexical scoping the Users class can access
	the variables scoped within the Controller class. I am specifying this to remind you that
	the function that invokes has to supply all the variables and resources for the function being
	passed on to do the job!		

*/


// this class is responsible for the Users collection in the Ryde mongodb database
class Users {

	constructor() {
		// this variable holds the mongodb database address
		this.db = "mongodb://localhost:27017/Ryde";
		// this variable holds the name of the collection that this model represents
		this.collection = "Users";
	}

	insert(user, successCallBack, failureCallBack) {
		MongoClient.connect(this.db, (err, db) => {
			if (err) {
				console.log("Error in finding the name in the Ryde database...");
			} else {
				db.collection(this.collection).insert(user, (err, doc) => {
					if (err) {
						console.log("Error in inserting the user in the Ryde database...")
						// this if statement is needed because we need to make sure that
						// we invoke the callback function only if the call back function is provided
						if (failureCallBack) {
							failureCallBack();
						}
					} else {
						console.log("User is successfully added to the Ryde database...")
						// this if statement is needed becauase we need to make sure
						// we invoke the callback function only if the call back function is provided
						if (successCallBack) {
							// the successCallBack will take the mongodb doc object
							// the call back function provided by the scope that will have this model object
							// will provide the logic with how you would like to deal with the doc, all this
							// function is responsible in this scope is calling that function wherer the logic
							// is provided from another scope
							successCallBack(doc);
						}
					}
					db.close();
				})
			}
		})
	}

	query(email, successCallBack, failureCallBack) {
		MongoClient.connect(this.db, (err, db) => {
			if (err) {
				console.log("Failed to connect to the Ryde database...");
			} else {
				db.collection(this.colelction).findOne({"email": email}, (err, doc) => {
					if (err) {
						console.log("Error in finding the name in the Ryde database...");
						// we check if a failureCallBack is provided by the scope which is using this
						// object's function, if it is we invoke the function
						if (failureCallBack) {
							failureCallBack();
						}
					} else {
						// doc will be returned as null if mongodb can't find an object
						// with the query specified
						if (doc === null) {
							// gain we only call the callback function if and only if it is provided
							// if it is not provided failureCallBack will be null
							if (failureCallBack) {
								failureCallBack();
							}
						} else {
							if (sucessCallBack) {
								// the successCallBack will take the mongodb doc object as a param
								// and this param will get supplied to the function and the logic with
								// what the function will do with the object will be provided by the scope
								// in which this model object is contained in
								successCallBack(doc);
							}
						}
					}
					// we close the database after we are done with all the interactions
					// this has to be within the function because if its not within the function
					// the db will always get closed before the function itself is invoked as
					// all mongodb functions are asynchronous
					db.close();
				});
			}
		});
	}
}

module.exports = Users;