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

	render() {
		return (
			<View>
				<Button title = "Driver" onPress = {Actions.driverview}/>
				<Text></Text>
				<Button title = "Passenger" onPress = {Actions.passengerview}/>
			</View>
		)
	}

}

module.exports = Choice;

AppRegistry.registerComponent("Choice", () => Choice);
