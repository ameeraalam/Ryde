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

class Chat extends Component {

	constructor(props) {
		super(props);
		this.address = "192.168.0.13";
		this.baseUrl = "http://" + this.address + ":3000/";
		this.state = {
			texts: []
		};

		this.someFunc();
	}

	someFunc() {
		let ts = this.state.texts;

		for (let i = 0; i < 10; ++i) {
			ts.push(<Text>hello</Text>);
		}

		this.setState({texts: ts});
	}


	render() {

		return (
			<View>
				{this.state.texts}
			</View>
		);


	}

}

module.exports = Chat;

AppRegistry.registerComponent("Chat", () => Chat);