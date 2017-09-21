import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View
} from "react-native";

class Main extends Component {
	render() {
		return (
			<View>
				<Text>
					Ryde!!!
				</Text>
			</View>
		);
	}
}

module.exports = Main;

AppRegistry.registerComponent("Main", () => Main);
