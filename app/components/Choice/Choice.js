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
	
	}

	submitPassenger() {

	}

	render() {
		return (
			<View>
				<Button title = "Driver" onPress = {this.submitDriver}/>
				<Text></Text>
				<Button title = "Passenger" onPress = {this.submitPassenger}/>
			</View>
		)
	}

}

module.exports = Choice;

AppRegistry.registerComponent("Choice", () => Choice);