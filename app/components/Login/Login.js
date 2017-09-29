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

import styles from "./styles"

class Login extends Component {

	constructor(props) {
		super(props);
		this.baseUrl = "http://192.168.0.10:3000/";
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