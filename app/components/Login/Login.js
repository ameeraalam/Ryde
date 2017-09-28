import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity
} from "react-native"
import styles from "./styles"

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			textEmail: "email",
			textPass: "password"
		}
	}

	submitButton() {
		fetch("http://192.168.0.23:3000/login", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				param: "hello world!"
			})
		});
	}

	registerButton() {
		alert("Registering!");
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

				<TouchableOpacity onPress = {this.submitButton} style = {{width: 200, height: 200}}>
					<Image
						style = {styles.submitButton}
						source = {require("./images/button.png")}
					/>
				</TouchableOpacity>

				<View style = {styles.registerContainer}>
					<Text>If not signed up then <Text onPress = {this.registerButton} style = {{color: "blue"}}>Register</Text></Text>
				</View>

			</View>
		)
	}
}

module.exports = Login;

AppRegistry.registerComponent("Login", () => Login);