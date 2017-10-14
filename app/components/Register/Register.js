import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity
} from "react-native";

import { Actions } from "react-native-router-flux";

import Choice from "../Choice/Choice";

import styles from "./styles";

class Register extends Component {

	constructor(props) {
		super(props);
		this.address = "10.164.192.166";
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
				color: "black"
			},

			lastNameS: {
				color: "black"
			},

			emailS: {
				color: "black"
			},

			passwordS: {
				color: "black"
			},

			dobS: {
				color: "black"
			},

			phoneS: {
				color: "black"
			},

			genderS: {
				color: "black"
			},

			plateS: {
				color: "black"
			},

			liscenseS: {
				color: "black"
			},
			
			carS: {
				color: "black"
			}
		}
	}

	emailCheck() {
		let emailCheck = false;
		let checkObj = {at: false, dot: false};

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

		if (checkObj.at && checkObj.dot) {
			emailCheck = true;
		}

		return emailCheck;
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

	submitButton() {

		let errors = [];

		let emailCheck = this.emailCheck();

		if (emailCheck === false) {
			this.setState({emailS: {color: "red"}});
			errors.push("email");
		} else {
			this.setState({emailS: {color: "black"}});
		}

		let phoneCheck = this.phoneCheck();

		if (phoneCheck === false) {
			this.setState({phoneS: {color: "red"}})
			errors.push("phone");
		} else {
			this.setState({phoneS: {color: "black"}});
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
			car: this.state.car
		}

		fetch(this.baseUrl + "register", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {
			if (res.status === 200) {
				alert("Success");
			} else {
				alert("Error");
			}
		}, (err) => {
			alert("Registration error...");
		});
	}


	render() {
		return (
			<View>
				<TextInput
					style = {this.state.firstNameS}
					value = {this.state.firstName}
					onChangeText = {(text) => this.setState({firstName: text, firstNameS: {color: "black"}})}

				/>

				<TextInput
					style = {this.state.lastNameS}
					value = {this.state.lastName}
					onChangeText = {(text) => this.setState({lastName: text, lastNameS: {color: "black"}})}


				/>

				<TextInput
					style = {this.state.emailS}
					value = {this.state.email}
					onChangeText = {(text) => this.setState({email: text, emailS: {color: "black"}})}

				/>	

				<TextInput
					style = {this.state.passwordS}
					value = {this.state.password}
					secureTextEntry = {true}
					onChangeText = {(text) => this.setState({password: text, passwordS: {color: "black"}})}

				/>

				<TextInput
					style = {this.state.dobS}
					value = {this.state.dob}
					onChangeText = {(text) => this.setState({dob: text, dobS: {color: "black"}})}

				/>	


				<TextInput
					style = {this.state.phoneS}
					value = {this.state.phone}
					onChangeText = {(text) => this.setState({phone: text, phoneS: {color: "black"}})}


				/>		

				<TextInput

					style = {this.state.genderS}
					value = {this.state.gender}
					onChangeText = {(text) => this.setState({gender: text, genderS: {color: "black"}})}


				/>

				<Text></Text>
				<Text>Optional</Text>
				<Text></Text>

				<TextInput

					style = {this.state.plateS}
					value = {this.state.plate}
					onChangeText = {(text) => this.setState({plate: text, plateS: {color: "black"}})}

				/>

				<TextInput

					style = {this.state.liscenseS}
					value = {this.state.liscense}
					onChangeText = {(text) => this.setState({liscense: text, liscenseS: {color: "black"}})}

				/>


				<TextInput

					style = {this.state.carS}
					value = {this.state.car}
					onChangeText = {(text) => this.setState({car: text, car: {color: "black"}})}

				/>

				<TouchableOpacity onPress = {() => {this.submitButton()}}>
					<Image
						style = {styles.submitButton}
						source = {require("./images/button.png")}
					/>
				</TouchableOpacity>

			</View>


		);
	}
}

module.exports = Register;

AppRegistry.registerComponent("Register", () => Register);