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
		// for now rydeObject's id is just a random float, but this id will be
		// the id attribute of an object that gets passed on from another page
		// as the rydeObject will be this.props.rydeObject
		this.rydeObject = {rydeId: Math.random()};
		this.address = "192.168.0.19";
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
			rydeId: this.rydeObject.rydeId,
			texts: []
		};

		// the reason texts is an empty array inside reqObj instead of being
		// texts: this.state.texts is because when we assign reqObj.texts to
		// this.state.texts both the variables are now pointing to the same
		// address in memory which is an array, to prevent we use a for loop
		// to iterate over the array object in memory and break it down into
		// two seperate array objects

		// what this for loop does is it goes over each content in the texts
		// array and simply converts the content to a JSON string from an object
		// this is done to prevent an error of insertion in mongodb
		for (let i = 0; i < reqObj.texts.length; ++i) {
			reqObj.texts[i] = JSON.stringify(this.state.texts[i]);
		}

		// now we have to communicate with the server by sending each chat messages
		// and storing the objects 

		fetch(this.baseUrl + "storeChat", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		})
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