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
		this.rydeObject = {rydeId: 4};
		this.address = "192.168.0.19";
		this.baseUrl = "http://" + this.address + ":3000/";
		this.state = {
			// textValue is the value that will be used as a placeholder in
			// the TextInput to type in things
			textValue: "",
			currentText: "",
			texts: [],
			lastEntryAt: 0
		};
		this.initMessages();
	}

	// Retrieves all the messages from the mongodb database and changes
	// the state's text attribute to the object retrieved from mongo db.
	// This function is called only when the page is displayed
	initMessages() {

		fetch(this.baseUrl + this.rydeObject.rydeId + "/getMesseges", {
			method: "GET"
		}).then((req) => {
			if (req.status === 200) {
				return req.json();
			} else {
				return false;
			}
		}).then((reqObj) => {
			if (reqObj) {
				for (let i = 0; i < reqObj.texts.length; ++i) {
					reqObj.texts[i] = JSON.parse(reqObj.texts[i]);
					console.log(reqObj.texts[i])
				}
			} else {
				console.log("Nothing to add...");
			}
		});


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
			texts: [],
			lastEntryAt: this.state.lastEntryAt
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
		for (let i = 0; i < this.state.texts.length; ++i) {
			reqObj.texts.push(JSON.stringify(this.state.texts[i]));
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
		}).then(() => {
			// after the asynchronous post request is finished we increase
			// the lastEntryAt counter indicating that 1 message has been sent!
			this.setState({lastEntryAt: ++this.state.lastEntryAt});
		})
	}

	render() {
		// this code translate whatever content is in the array to the view		
		//{this.state.texts}

		// On press we need to wrap the function this.buttonPress inside an
		// arrow function because this object becomes unknown inside the buttonPress
		// function if not done so. This is because the buttonPress function cannot
		// access the scope of the this object and the this object is something else
		// when assigned to the onPress variable. We also set the placeholder value
		// for the TextInput to whatever is being typed everytime the text changes

		// On focus we empty out the placeholder value which is the textValue variable
		// in the react components state. This allows the box to refresh out for another
		// input
		return (
			<ScrollView>
				<View>
					{this.state.texts}
				</View>

				<View style = {styles.textBoxContainer}>
					<TextInput
						value = {this.state.textValue}
						onChangeText = {(text) => {
							let newText = this.userName + ": " + text;
							this.setState({currentText: newText});
							this.setState({textValue: text});
						}}
						onFocus = {() => {
							this.setState({textValue: ""});
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