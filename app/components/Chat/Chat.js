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

class Chat extends Component {

	constructor(props) {
		super(props);
		this.address = "172.17.77.31";
		this.baseUrl = "http://" + this.address + ":3000/";
		this.colors = ["blue", "red", "green", "purple", "orange", "teal", "violet", "sienna"]
		this.state = {
			texts: []
		};
		this.initMessages();
	}

	// Retrieves all the messages from the mongodb database and changes
	// the state's text attribute to the object retrieved from mongo db.
	// This function is called only when the page is displayed
	initMessages() {

		// let ts = this.state.texts;

		// for (let i = 0; i < 10; ++i) {
		// 	ts.push(<Text>hello</Text>);
		// }

		// this.setState({texts: ts});

	}

	buttonPress() {
		fetch(this.baseUrl + "polling", {
			method: "GET"
		}).then((res) => {
			if (res.status === 200) {
				alert("Message received");
			} else {
				alert("Server returned an error");
			}
		}, (err) => {
			if (err) {
				alert(err);
			}
		});
	}

	buttonPressTwo() {
		fetch(this.baseUrl + "anotherRequest", {
			method: "GET"
		}).then((res) => {
			if (res.status === 200) {
				alert("Background stuff happened");
			} else {
				alert("Server returned an error");
			}
		}, (err) => {
			if (err) {
				alert(err);
			}
		});
	}

	render() {
		// this code translate whatever content is in the array to the view		
		//{this.state.texts}

		// On press we need to wrap the function this.buttonPress inside an
		// arrow function because this object becomes unknown inside the buttonPress
		// function if not done so. This is because the buttonPress function cannot
		// access the scope of the this object and the this object is something else
		// when assigned to the onPress variable.
		return (
			<View>

		
				<Button
					title = "Click me!"
					onPress = {() => {this.buttonPress()}}
				/>

				<Button
					title = "Click me too!"
					onPress = {() => {this.buttonPressTwo()}}
				/>

			</View>
		);


	}

}

module.exports = Chat;

AppRegistry.registerComponent("Chat", () => Chat);