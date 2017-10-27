'use strict'

/* Imports */
let bcrypt = require("bcrypt"); // encryption module
let Users = require("./../models/Users.js") // Users database model
let Rydes = require("./../models/Rydes.js")
let IdGenerator = require("./../helpers/IdGenerator.js"); // a class that generates unique user ids
let Chat = require("./../models/Chat.js");

/* Constants */
const SALT = 10; // salt for bycrpt password hashing

class Controller {

	constructor() {
		this.modelUsers = new Users();
		this.modelRydes = new Rydes();
		this.modelRydes = new RydesInfo();
		this.idGen = new IdGenerator();
		this.modelChat = new Chat();
	}

	intro() {
		console.log('Server is listening on port 3000...');
	}

	// contains the logic for the login feature of the app
	login(req, res) {
		// First thing we have to do is query mongodb and find the object
		// using the email, after finding the object we have to compare
		// the password hash provided by the user and the password hash in the database
		this.modelUsers.query({"email": req.body.email}, (doc) => {
			// bcrypt.compare will compare the password attribute of the object provided
			// by the user with the document object's password field in mongodb
			// bcrypt.compare(), takes two 3 arguments, the password in strings, the
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
		this.modelChat.query({"rydeId": i ad}, (doc) => {

	driverview(req,res){
		this.modelRydes.query({"driver": req.body.email}, () => {
			res.sendStatus(200);
		}, () => {
			res.sendStatus(404);
		})
	}

	//pending passenger and current passenger should be an array. need to figure out how will i loop through them here

	pending(req,res){
		this.modelRydes.query({"pendingPassenger": req.body.email}, () => {
			res.sendStatus(200);
		}, () => {
			res.sendStatus(404);
		})
	}

	available(req, res) {
		this.modelRydes.query({"currentPassenger": req.body.email}, () => {
			res.sendStatus(200);
		}, () => {
			pending(req, res);
		})
	}



}

module.exports = Controller;
