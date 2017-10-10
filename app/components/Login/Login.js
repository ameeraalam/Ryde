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

import styles from "./styles";

class Login extends Component {

	constructor(props) {
		super(props);
		this.address = "192.168.0.13";
		this.baseUrl = "http://" + this.address + ":3000/";
		this.state = {
			textEmail: "Email",
			textPass: "Password"
		}
	}

	submitButton() {
		let reqObj = {
			email: this.state.textEmail,
			password: this.state.textPass
		}
		fetch(this.baseUrl + "login", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {
			if (res.status === 200) {
				// The response object returned contains the object being sent
				// from the server, we need to call the function res.json() which will
				// return the json object being sent by the server.
				resObjPromise = res.json(); // returns a promise and is asynchronous
				// promise value is extracted using the .then function and the object
				// returned by the promise is used
				resObjPromise.then(function(resObj) {
					// We then pass the resObj as a property for the choise page
					Actions.choice({resObj});
				})
			} else {
				alert("Wrong username or password");
			}

		}, (err) => {
			alert(err)
		});
	}

	registerButton() {
		Actions.register({});
	}

	render() {
		return (
			<View style = {styles.container}>
				<TextInput
					style = {styles.inputBox}
					value = {this.state.textEmail}
					onChangeText = {(text) => this.setState({textEmail: text})}
				/>
				<TextInput
					style = {styles.inputBox}
					secureTextEntry = {true}
					value = {this.state.textPass}
					onChangeText = {(text) => this.setState({textPass: text})}
				/>

				<TouchableOpacity onPress = {() => {this.submitButton()}} style = {{width: 200, height: 200}}>
					<Image
						style = {styles.submitButton}
						source = {require("./images/button.png")}
					/>
				</TouchableOpacity>

				<View style = {styles.registerContainer}>
					<Text>If not signed up then <Text onPress = {this.registerButton} style = {{color: "blue"}}>Register</Text></Text>
				</View>

			</View>
		);
	}
}

module.exports = Login;

AppRegistry.registerComponent("Login", () => Login);