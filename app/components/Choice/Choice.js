import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	Button,
	TouchableOpacity
} from "react-native";

import { Actions } from "react-native-router-flux";

import styles from "./styles";

class Choice extends Component {

	constructor(props) {
		super(props);
	}

	submitDriver() {
		// Takes you to driver's home page, if all infos are filled.
		// Otherwise a page will pop up asking for incomplete driver fields to be completed
		if (!this.props.resObj.allInfoFilled) {
			let resObj = this.props.resObj
			// the resObj that gets passed on to Choice component will be
			// passed to the DriverInfo component 
			Actions.driverInfo({resObj});
		} else {
			// take to the driver's home page
			alert("Link me to driver's homepage");
		}
	}

	submitPassenger() {
		// takes you to passenger's home page

		alert("Link me to passenger's homepage");
	}

	render() {
		return (
			<View>
				<Button title = "Driver" onPress = {() => {this.submitDriver()}}/>
				<Text></Text>
				<Button title = "Passenger" onPress = {this.submitPassenger}/>
			</View>
		)
	}

}

module.exports = Choice;

AppRegistry.registerComponent("Choice", () => Choice);