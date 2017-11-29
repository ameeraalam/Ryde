
'use strict'

/* Imports */
let bcrypt = require("bcrypt"); // encryption module
let Users = require("./../models/Users.js") // Users database model
<<<<<<< HEAD
let IdGenerator = require("./../helpers/IdGenerator.js"); // a class that generates unique user ids
let Chat = require("./../models/Chat.js");
let PersonalRydes = require("./../models/PersonalRydes.js");
let Rydes = require("./../models/Rydes.js");
<<<<<<< HEAD
<<<<<<< HEAD
let RydeID = require("./../models/RydeID.js");
=======
=======
>>>>>>> master
=======
let Rydes = require("./../models/Rydes.js")
let PersonalRydes = require("./../models/PersonalRydes.js")
let IdGenerator = require("./../helpers/IdGenerator.js"); // a class that generates unique user ids
let Chat = require("./../models/Chat.js");
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> master

/* Constants */
const SALT = 10; // salt for bycrpt password hashing

class Controller {

	constructor() {
		this.modelUsers = new Users();
<<<<<<< HEAD
		this.idGen = new IdGenerator();
		this.modelChat = new Chat();
		this.modelPersonalRydes = new PersonalRydes();
		this.modelRydes = new Rydes();
<<<<<<< HEAD
<<<<<<< HEAD
		this.rydeID = new RydeID();
=======
=======
>>>>>>> master
=======
		this.modelRydes = new Rydes();
		this.modelPersonalRydes = new PersonalRydes();
		this.idGen = new IdGenerator();
		this.modelChat = new Chat();
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> master
	}

	intro() {
		console.log('Server is listening on port 3000...');
	}

	// contains the logic for the login feature of the app
	login(req, res) {
		// First thing we have to do is query mongodb and find the object
		// using the email, after finding the object we have to compare
<<<<<<< HEAD
		// the password hash provided by the user and the password hash in the database 
		this.modelUsers.query({"email": req.body.email}, (doc) => {
			// bcrypt.compare will compare the password attribute of the object provided
			// by the user with the document object's password field in mongodb
			// bcrypt.compare(), takes two 3 arguments, the password in strings, the 
=======
		// the password hash provided by the user and the password hash in the database
		this.modelUsers.query({"email": req.body.email}, (doc) => {
			// bcrypt.compare will compare the password attribute of the object provided
			// by the user with the document object's password field in mongodb
			// bcrypt.compare(), takes two 3 arguments, the password in strings, the
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
			// hashed password and the callback function
			bcrypt.compare(req.body.password, doc.password, (err, result) => {
				if (err) {
					res.sendStatus(404);
				} else {
					// if result is true it means that both the passwords match
					if (result === true) {
						// creating a response object to send back to the client
						let resObj = {};
						resObj.firstName = doc.firstName;
						resObj.lastName = doc.lastName;
						resObj.email = doc.email;
						resObj.dob = doc.dob;
						resObj.phone = doc.phone;
						resObj.gender = doc.gender;
						resObj.plate = doc.plate;
						resObj.car = doc.car;
						resObj.allInfoFilled = doc.allInfoFilled;
						resObj.id = doc.id;
						res.status(200).send(resObj);
					} else {
						res.sendStatus(404);
					}
				}
			});
		}, () => {
			res.sendStatus(404);
		});
<<<<<<< HEAD
=======

>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
	}

	// contains the logic for the register feature of the app
	register(req, res) {
		bcrypt.genSalt(SALT, (err, salt) => {
			if (err) {
				res.sendStatus(404);
			} else {
				bcrypt.hash(req.body.password, salt, (err, hash) => {
					req.body.password = hash;
					this.idGen.generate(req.body.firstName, req.body.lastName, req.body.email);
					req.body.id = this.idGen.retrieve();
					this.modelUsers.insert(req.body, () => {
						res.sendStatus(200);
					}, () => {
						res.sendStatus(404);
					});
				})
			}
		})
	}

	emailCheck(req, res) {
		this.modelUsers.query({"email": req.body.email}, (doc) => {
			// if doc returned by mongo db isn't null we know
			// that the email provided by the user already exists
			res.sendStatus(404);
		}, () => {
			// on failure call back mongo db will return the doc as null
			// if its null it means the email is unique
			res.sendStatus(200);
		});
	}

	driverInfo(req, res) {
		this.modelUsers.update({"email": req.body.email}, {plate: req.body.plate, liscense: req.body.liscense, car: req.body.car, allInfoFilled: true}, () => {
			res.sendStatus(200);
		}, () => {
			res.sendStatus(404);
		});
	}
<<<<<<< HEAD

	createPersonalRyde(req, res) {
		this.modelPersonalRydes.insert({"email": req.params.email, "rydesPostedAsDriver": [], "rydesAppliedToAsPassenger": [], "rydesAcceptedToAsPassenger": []}, () => {
			res.sendStatus(200);
		}, () => {
			res.sendStatus(404);
		});
	}

	postRyde(req, res){
		
		this.modelRydes.insert(req.body, () => {
			console.log("Ryde added to Ryde DB");
				
			/*this.modelPersonalRydes.updatePush({"email": req.body.email}, {"rydesPostedAsDriver": req.body}, () => {
				console.log("Ryde added to PersonalRyde DB");
			}, () => {
				console.log("Failed to add Ryde to users PersonalRyde DB");
			});*/

			res.sendStatus(200);
		
		}, () => {
			res.sendStatus(404);
			console.log("Failed to add Ryde to DB");
		});
	}

	findRyde(req, res){
		
		// Looking for Rydes with same destination
		this.modelRydes.findAll({"to": req.body.to}, (cursor) => {

			let potentialRides = cursor.toArray();
			let sameDestination = {dest:[]};

			potentialRides.then((response) => {
				
				console.log("Res length is " + response.length);	
				for (let i = 0; i < response.length; i++){

					// If the Ryde is full
					if (response[i].members.length === response[i].numPassengers){
						continue;
					}

					// If the to and from locations match then the Ryde is valid
					if ((response[i].from === req.body.from) && (response[i].to === req.body.to)){
						console.log("Ryde found!");	
						sameDestination.dest.push(response[i]);
					}
				}

				console.log(sameDestination);

				res.status(200).send(sameDestination);
			});
		}, () => {
			res.sendStatus(404);
		});

	}
	

	getPassengerRequests(req, res) {
		this.modelPersonalRydes.query({"email": req.params.email}, (doc) => {
			// on successfully querying the data we sent the res object back
			// the response object
			let resObj = {};
			for (let i = 0; i < doc.rydesPostedAsDriver.length; ++i) {
				// creates an attribute within the res object with the id name of the ryde
				// which will hold values of arrays containing the requests to that ryde
				resObj[doc.rydesPostedAsDriver[i].rydeId] = [];
				for (let j = 0; j < doc.rydesPostedAsDriver[i].requests.length; ++j) {
					resObj[doc.rydesPostedAsDriver[i].rydeId].push(doc.rydesPostedAsDriver[i].requests[j]);
				}
			}
			// this for loop will generate a response object which will loop like this:
			// resObj = {"1": [firstName: "Brian", lastName: "West", email: "brianwest@ryde.com", dob: "12/12/1994", phone: "615897446", …], "2": [], "3": []}
			// where "1", "2", "3" are the keys of the object which are the id's of the different rydes posted by the driver
			res.status(200).send(resObj);
		}, () => {
			// on unsuccesful query we sent 404 code
			res.sendStatus(404);
		});
	}

	getRydeID(req, res){

		this.rydeID.query({"queryField": req.body.query}, (doc) => {

			console.log("Ryde ID retrieved and sent");
			res.status(200).send(doc);
		}, () => {
			
			console.log("Ryde ID not retrieved");
			res.sendStatus(404);
		});
	}

	incrementRydeID(req, res){

		// Variable that current ID value from the database will be assigned to
		//let currentID = undefined;

		// Query the DB to find the object with the Ryde ID we want to increment
		/*this.rydeID.query({"queryField": req.body.query}, (doc) => {

			console.log("doc.rydeID = " + doc.rydeID);
			currentID = doc.rydeID;
			//res.sendStatus(200);
		}, () => {
			//res.sendStatus(404);
		});

		console.log("currentID is " + currentID);
		// Increment ID
		currentID++;
		*/
		
		// Update object in DB with the incremented Ryde ID
		this.rydeID.update({"queryField": req.body.query}, {rydeID: req.body.rydeID + 1}, () => {
			
			console.log("Ryde ID has been incremented to " + (req.body.rydeID + 1));
			res.sendStatus(200);
		}, () => {
			console.log("Ryde ID has not been incremented");
			res.sendStatus(404);
		});
	}

	driverView(req, res){
		this.modelPersonalRydes.query({"email": req.params.email}, (doc) => {
			let obj = [];
			for(let i=0;i<doc.rydesPostedAsDriver.length;i++){
				obj.push(doc.rydesPostedAsDriver[i])
			}
			res.status(200).send(obj);
		}, () => {
			res.sendStatus(404);
		});
	}

	err(req, res) {
		console.log("Processing error....");
		res.sendStatus(404);
	}


	socketIntro() {
		console.log("Socket is open on port 4000...");
	}


	connection(socket) {
		console.log("Connection received from " +  socket.id + "...");
	}

	idEnquiry(socket) {
		console.log("Id has been sent by the socket...");
		// creating a promise for the async socket event
		return new Promise((resolve, reject) => {
			socket.on("idEnquiry", (id) => {
				console.log("Socket request " + id +  "...");
				socket.join(id);
				resolve(id);
			})
		});
	}
	
	initMessages(socket, id) {
		this.modelChat.query({"rydeId": id}, (doc) => {

			// successful in finding the object from mongodb
			console.log("Success emission...");
			socket.emit(id + "/success");

			console.log(id + "/initMessages" + " emission...");
			socket.emit(id + "/initMessages", doc);

		}, () => {

			// failure in finding the object in mongodb
			console.log("Failure emission...");
			socket.emit(id + "/failure");
		});
	}


	storeChat(io, socket, id) {
		socket.on(id + "/storeChat", (reqObj) => {
			console.log("Socket request " + id + "/storeChat...");
			this.modelChat.query({"rydeId": Number(id)}, (doc) => {
				// we update the text array in the database by adding the new messages to it
				// from the request objects body containing the new text
				doc.texts.push({username: reqObj.username, text: reqObj.text});
				// if we find the object we then update it
				this.modelChat.update({"rydeId": reqObj.rydeId}, {rydeId: reqObj.rydeId, texts: doc.texts}, (doc) => {
					// sending socket connection for success in the job
					console.log("Success emission...");
					socket.emit(id + "/success");

					// now to broadcast the message to everyone in the chat room
					console.log("Broadcasting message from room-" + id + " emission");
					io.to(id).emit(id + "/broadcast", doc);

				}, () => {
					// sending socket connection for failure in the job
					console.log("Failure emission...");
					socket.emit(id + "/failure");
				});
			}, () => {
				// if we can't find the object we insert the object
				let dbObj = {
					rydeId: reqObj.rydeId,
					texts: []
				}
				// pushing the message received to the db object's texts attribute
				// which is an array
				dbObj.texts.push({username: reqObj.username, text: reqObj.text});
				this.modelChat.insert(dbObj, () => {
					// sending socket connection for success in the job
					console.log("Success emission...");
					socket.emit(id + "/success");

					// now we broadcast the message to everyone in the chat room
					console.log("Broadcasting message from room-" + id + " emission");
					io.to(id).emit(id + "/broadcast", dbObj);

				}, () => {
					// sending socket connection for failure in the job
					console.log("Failure emission...");
					socket.emit(id + "/failure");
				});

			});
		});
	}
=======

//for getting posts as a driver
	driverView(req, res){
		this.modelPersonalRydes.query({"email": req.params.email}, (doc) => {
			let obj = [];
			for(let i=0;i<doc.rydesPostedAsDriver.length;i++){
				obj.push(doc.rydesPostedAsDriver[i])
			}
			res.status(200).send(obj);
		}, () => {
			res.sendStatus(404);
		});
	}

//for getting pending requests as a passenger
	pending(req,res){
		console.log(req.params.email);
		this.modelPersonalRydes.query({"email": req.params.email}, (doc) => {
			let obj = [];
			for(let i =0; i< doc.rydesAppliedToAsPassenger.length; i++){
				obj.push(doc.rydesAppliedToAsPassenger[i]);
			}
			res.status(200).send(obj);
		}, () => {
			res.sendStatus(404);
		})
	}

//for getting available requests as a passenger
	available(req, res) {
		this.modelPersonalRydes.query({"email": req.params.email}, (doc) => {
			let obj = [];
			for(let i=0;i<doc.rydesAcceptedToAsPassenger.length;i++){
				obj.push(doc.rydesAcceptedToAsPassenger[i]);
			}
			res.status(200).send(obj);
		}, () => {
			res.sendStatus(404);
		})
	}

  //used when you request to join a ride as a passenger. this is related to the passengersearchprofile.js
	//use updatePush for the request for passengers.
	//update the ryde collection, requests [] with the passenger info
	//update the personalrydes collection, rydespostedasdriver, requests with the passenger info
	//update the personalrydes collection, rydesAppliedToAsPassenger with the ride info
	passengerSearch(req,res) {
		this.modelPersonalRydes.updatePush({"email": req.body.myRes.email},{"rydesAppliedToAsPassenger":req.body.driverRes} ,() => {
			this.modelRydes.updatePush({"rydeId": req.body.driverRes.rydeId}, {"requests":req.body.myRes},() => {

				this.modelPersonalRydes.query({"email": req.body.driverRes.driver}, (doc)=> {

					let rydeToModify = undefined;
					// we also need a variable to save the index of rydesPostedAsDriver array which was going to be modified
					let indexModified = 0;
					for (let i = 0; i < doc.rydesPostedAsDriver.length; ++i) {
						// we find the specific ryde from the array of rydes that the driver posted
						if (doc.rydesPostedAsDriver[i].rydeId === req.body.driverRes.rydeId) {
							rydeToModify = doc.rydesPostedAsDriver[i];
							indexModified = i;
						}
					}

					rydeToModify.requests.push(req.body.myRes);

					doc.rydesPostedAsDriver[indexModified] = rydeToModify;

					this.modelPersonalRydes.update({"email": req.body.myRes.email}, {"rydesPostedAsDriver": doc.rydesPostedAsDriver}, (doc) => {
						res.sendStatus(200);
					}, () => {
						res.sendStatus(404);
					});


				}, () => {
					res.sendStatus(404);
				});


			}, () => {
				res.sendStatus(404);
			});
		}, () => {
			res.sendStatus(404);
		});
	}

	err(req, res) {
		console.log("Processing error....");
		res.sendStatus(404);
	}


	socketIntro() {
		console.log("Socket is open on port 4000...");
	}


	connection(socket) {
		console.log("Connection received from " +  socket.id + "...");
	}

	idEnquiry(socket) {
		console.log("Id has been sent by the socket...");
		// creating a promise for the async socket event
		return new Promise((resolve, reject) => {
			socket.on("idEnquiry", (id) => {
				console.log("Socket request " + id +  "...");
				socket.join(id);
				resolve(id);
			})
		});
	}









>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
}

module.exports = Controller;

