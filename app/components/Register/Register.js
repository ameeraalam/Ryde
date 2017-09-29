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
		this.baseUrl = "http://172.17.72.143:3000/";
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
			car: "Car model number"
		}
	}

	submitButton() {
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
		});
	}


	render() {
		return (
			<View>
				<TextInput

					value = {this.state.firstName}
					onChangeText = {(text) => this.setState({firstName: text})}

				/>

				<TextInput

					value = {this.state.lastName}
					onChangeText = {(text) => this.setState({lastName: text})}


				/>

				<TextInput

					value = {this.state.email}
					onChangeText = {(text) => this.setState({email: text})}

				/>	

				<TextInput

					value = {this.state.password}
					secureTextEntry = {true}
					onChangeText = {(text) => this.setState({password: text})}

				/>

				<TextInput

					value = {this.state.dob}
					onChangeText = {(text) => this.setState({dob: text})}

				/>	


				<TextInput

					value = {this.state.phone}
					onChangeText = {(text) => this.setState({phone: text})}


				/>		

				<TextInput

					value = {this.state.gender}
					onChangeText = {(text) => this.setState({gender: text})}


				/>

				<Text></Text>
				<Text>Optional</Text>
				<Text></Text>

				<TextInput

					value = {this.state.plate}
					onChangeText = {(text) => this.setState({plate: text})}

				/>

				<TextInput

					value = {this.state.liscense}
					onChangeText = {(text) => this.setState({liscense: text})}

				/>


				<TextInput

					value = {this.state.car}
					onChangeText = {(text) => this.setState({car: text})}

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