import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	Button,
	ScrollView,
	TouchableOpacity
} from "react-native";

import { Actions } from "react-native-router-flux";

import styles from "./styles";

class Chat extends Component {

	constructor(props) {
		super(props);
		this.userName = "Tanvir";
		this.address = "172.17.77.31";
		this.baseUrl = "http://" + this.address + ":3000/";
		this.state = {
			currentText: "",
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


	sendMessage() {
		let updatedTexts = this.state.texts;
		updatedTexts.push(<Text>{this.state.currentText}</Text>);
		this.setState({texts: updatedTexts});

		let reqObj = {
			texts = this.state.texts
		};

		// now we have to communicate with the server by sending each chat messages
		// and storing the objects 

		fetch(this.baseUrl + "storeChat", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {
			if (res.status === 200) {

			} else {


			}
		}, (err) => {

			alert("Error in communicating with Ryde server");


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
			<ScrollView>
				<View>
					{this.state.texts}
				</View>

				<View style = {styles.textBoxContainer}>
					<TextInput
						onChangeText = {(text) => {
							let newText = this.userName + ": " + text;
							this.setState({currentText: newText})
						}}
					></TextInput>	
					<Button
						onPress = {() => {this.sendMessage()}}
						title = "Send"
					></Button>
				</View>
			</ScrollView>
		);
	}

}

module.exports = Chat;

AppRegistry.registerComponent("Chat", () => Chat);