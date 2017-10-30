import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";

import {
	Form,
	Item,
	Label,
	Input,
	ListItem
} from "native-base";

import { Actions } from "react-native-router-flux";

import Choice from "../Choice/Choice";

import styles from "./styles";


class Register extends Component {

	constructor(props) {
		super(props);
		this.address = "172.17.85.172";
		this.baseUrl = "http://" + this.address + ":3000/";
		this.state = {
			firstName: "First name",
			lastName: "Last name",
			email: "Email",	
			password: "password",
			dob: "Date of birth",
			phone: "Mobile phone number",
			gender: "Gender",
			plate: "Car plate number",
			liscense: "Driver's liscense number",
			car: "Car model number",
			firstNameS: {
				color: "grey"
			},

			lastNameS: {
				color: "grey"
			},

			emailS: {
				color: "grey"
			},

			passwordS: {
				color: "grey"
			},

			dobS: {
				color: "grey"
			},

			phoneS: {
				color: "grey"
			},

			genderS: {
				color: "grey"
			},

			plateS: {
				color: "grey"
			},

			liscenseS: {
				color: "grey"
			},
			
			carS: {
				color: "grey"
			}
		}
	}

	emailCheck() {
		let emailCheck = false;
		let checkObj = {at: false, dot: false, email: false};

		for (let i = 0; i < this.state.email.length; ++i) {
			// all the expression need to be true in order for the entire expression
			// to be true
			if (this.state.email[i] === "@") {
				checkObj.at = true;
				// if a letter is @ then the letter cannot be anything else again
				// therefore we continue the loop by skipping the if statement below
				continue;
			}

			if (this.state.email[i] === ".") {
				checkObj.dot = true;
			}

		}

		let emailObj = {email: this.state.email};

		// The fetch function call will return a promise and takes in two parameter
		// first is the url with which it makes a request and second parameter
		// is an object specifying the method details and the object that will
		// get sent. The promise being returned, gives back two call back functions
		// first contains one parameter which is the response object and the second
		// function contains one parameter which is the err.

		// the promise returned by the fetch function will be the return of the
		// .then function, so we are returning a promise
		return fetch(this.baseUrl + "emailCheck", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(emailObj)
		}).then((res) => {
			// Since fetch is asynchronous that returns a promise, we want to do
			// all the checks after this async function returns the promise and so
			// we use the .then function and then do all the checks, because any check
			// outside the .then function will execute first before the async function
			// finishes
			if (res.status === 200) {
				checkObj.email = true;
				if (checkObj.at && checkObj.dot && checkObj.email) {
					// Initially emailCheck is false, not email check will result in
					// emailCheck being true
					emailCheck = !emailCheck;
				}
				return emailCheck;
			} else {
				alert("A user with the email is already registered");
				return emailCheck;
			}
		}, (err) => {
			alert(err)
			return emailCheck;
		});
	}

	phoneCheck() {
		let phoneCheck = true;

		for (let i = 0; i < this.state.phone.length; ++i) {
			// Either of these expression being true will result in the statement eing true, 
			// only if both the statements are false then the first half of the expression will be false.
			// Both the expression in the outer expresion need to be true in order for the entire expression to be true,
			// one of the expression being false will result in the entire statement being false.
			if ((this.state.phone.charCodeAt(i) < 48 || this.state.phone.charCodeAt(i) > 57) && this.state.phone.charCodeAt(i) !== 43) {
				phoneCheck = false;
			}
		}

		return phoneCheck;
	}

	driverFieldsCheck() {
		let plateCounter = 0;
		let liscenseCounter = 0;
		let carCounter = 0;

		for (let i = 0; i < this.state.plate.length; ++i) {
			// The expression has an and because the letter has to be WITHIN 64 and 123 and only way
			// it can be within is if it is both greater than 64 and less than 123, also if the char code is a space
			// the whole expression will be true. Either one of these expression needs to be true in order for the entire
			// expression to evaluate to true. And both the inner expression needs to be true in order for the inner expression
			// to evaluate to true
			if ((this.state.plate.charCodeAt(i) > 64 && this.state.plate.charCodeAt(i) < 123) || this.state.plate.charCodeAt(i) === 32) {
				++plateCounter;
			}
		}

		for (let i = 0; i < this.state.liscense.length; ++i) {
			if ((this.state.liscense.charCodeAt(i) > 64 && this.state.liscense.charCodeAt(i) < 123) || this.state.liscense.charCodeAt(i) === 32) {
				++liscenseCounter;
			}
		}

		for (let i = 0; i < this.state.car.length; ++i) {
			if ((this.state.car.charCodeAt(i) > 64 && this.state.car.charCodeAt(i) < 123) || this.state.car.charCodeAt(i) === 32) {
				++carCounter;
			}
		}

		if (plateCounter === this.state.plate.length || liscenseCounter === this.state.liscense.length || carCounter === this.state.car.length) {
			return false;
		}

		return true;
	}

	firstNameChecker() {
		if (this.state.firstName.length === 0) {
			return false;
		}
		return true;
	}

	lastNameChecker() {
		if (this.state.lastName.length === 0) {
			return false;
		}
		return true;
	}

	submitButton() {
		let errors = [];

		let emailCheck = this.emailCheck();

		emailCheck.then((val) => {
			
			if (val === false) {
				this.setState({emailS: {color: "red"}});
				errors.push("email");
			} else {
				this.setState({emailS: {color: "grey"}});
			}

			let phoneCheck = this.phoneCheck();

			if (phoneCheck === false) {
				this.setState({phoneS: {color: "red"}})
				errors.push("phone");
			} else {
				this.setState({phoneS: {color: "grey"}});
			}

			if (this.firstNameChecker() === false) {
				this.setState({firstNameS: {color: "red"}});
				errors.push("firstName");
			} else {
				this.setState({firstNameS: {color: "grey"}})
			}

			if (this.lastNameChecker() == false) {
				this.setState({lastNameS: {color: "red"}});
				errors.push("lastName");
			} else {
				this.setState({lastNameS: {color: "grey"}});
			}

			let reqObj = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				password: this.state.password,
				dob: this.state.dob,
				phone: this.state.phone,
				gender: this.state.gender,
				plate: this.state.plate,
				liscense: this.state.liscence,
				car: this.state.car,
				allInfoFilled: this.driverFieldsCheck()
			}

			// I want to send the object only if there are no errors
			if (errors.length === 0) {
				// The fetch function call will return a promise and takes in two parameter
				// first is the url with which it makes a request and second parameter
				// is an object specifying the method details and the object that will
				// get sent. The promise being returned, gives back two call back functions
				// first contains one parameter which is the response object and the second
				// function contains one parameter which is the err.
				fetch(this.baseUrl + "register", {
					method: "POST",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify(reqObj)
				}).then((res) => {
					if (res.status === 200) {
						// change alert later
						alert("Registration complete");
						// on completing the registration we create the personal rydes object which
						// every user will have
						// we send the email address using the query string
						fetch(this.baseUrl + this.state.email + "/createPersonalRyde", {
							method: "GET"
						// res means response object
						}).then((res) => {
							if (res.status === 200) {
								alert("Registration complete");
								// on completing the registration we switch to the login page
								Actions.login({});
							} else {
								alert("Error");
							}
						// err means the error returned from the promise
						}, (err) => {
							alert("Server error")

						});
					} else {
						alert("Error");
					}
				}, (err) => {
					alert("Server error");
				});
			}

		})

	}


	render() {
		return (
			<ScrollView>
				<Form>
					<Item floatingLabel>
						<Label style = {this.state.firstNameS}>First name</Label>
						<Input
							onChangeText = {(text) => this.setState({firstName: text, firstNameS: {color: "grey"}})}
						/>
					</Item>
				</Form>

				<Form>
					<Item floatingLabel>
						<Label style = {this.state.lastNameS}>Last name</Label>
						<Input
							onChangeText = {(text) => this.setState({lastName: text, lastNameS: {color: "grey"}})}
						/>
					</Item>
				</Form>


				<Form>
					<Item floatingLabel>
						<Label style = {this.state.emailS}>Email</Label>
						<Input
							onChangeText = {(text) => this.setState({email: text, emailS: {color: "grey"}})}
						/>
					</Item>
				</Form>

				<Form>
					<Item floatingLabel>
						<Label style = {this.state.passwordS}>Password</Label>
						<Input
							secureTextEntry = {true}
							onChangeText = {(text) => this.setState({password: text, passwordS: {color: "grey"}})}

						/>
					</Item>
				</Form>

				<Form>
					<Item floatingLabel>
						<Label style = {this.state.dobS}>Date of birth</Label>
						<Input
							onChangeText = {(text) => this.setState({dob: text, dobS: {color: "grey"}})}
						/>	
					</Item>
				</Form>

				<Form>
					<Item floatingLabel>
						<Label style = {this.state.phoneS}>Phone number</Label>
						<Input
							onChangeText = {(text) => this.setState({phone: text, phoneS: {color: "grey"}})}
						/>		
					</Item>
				</Form>

				<Form>
					<Item floatingLabel>
						<Label style = {this.state.genderS}>Gender</Label>
						<Input
							onChangeText = {(text) => this.setState({gender: text, genderS: {color: "grey"}})}
						/>
	
					</Item>
				</Form>

				<Text>  </Text>

				<ListItem itemHeader>
					<Text>OPTIONAL</Text>
				</ListItem>


				<Form>
					<Item floatingLabel>
						<Label style = {this.state.plateS}>Plate number</Label>
						<Input
							onChangeText = {(text) => this.setState({plate: text, plateS: {color: "grey"}})}
						/>
					</Item>
				</Form>


				<Form>
					<Item floatingLabel>
						<Label style = {this.state.liscenseS}>Liscense number</Label>
						<Input
							onChangeText = {(text) => this.setState({liscense: text, liscenseS: {color: "grey"}})}
						/>
					</Item>
				</Form>



				<Form>
					<Item floatingLabel>
						<Label style = {this.state.carS}>Car Model</Label>
						<Input
							onChangeText = {(text) => this.setState({car: text, car: {color: "grey"}})}
						/>
					</Item>
				</Form>


				<TouchableOpacity onPress = {() => {this.submitButton()}}>
					<Image
						style = {styles.submitButton}
						source = {require("./images/button.png")}
					/>
				</TouchableOpacity>

			</ScrollView>


		);
	}
}

module.exports = Register;

AppRegistry.registerComponent("Register", () => Register);