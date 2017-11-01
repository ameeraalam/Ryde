import React, { Component } from "react";
import {
	Container,
	Header,
	Content,
	Item,
	Input,
	Card,
	CardItem,
	Body,
	List,
	ListItem,
	Left,
	Right,
	Thumbnail
} from "native-base";
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

import clientIO from "socket.io-client";

class Chat extends Component {

	constructor(props) {
		super(props);
		this.username = "Tanvir";
		// for now rydeObject's id is just a random float, but this id will be
		// the id attribute of an object that gets passed on from another page
		// as the rydeObject will be this.props.rydeObject
		this.rydeObject = {rydeId: 4};
		this.address = "192.168.0.30";
		this.baseUrl = "http://" + this.address + ":3000/";
		// creating the socket object specific to this client
		this.socket = clientIO("http://" + this.address + ":4000/");
		this.state = {
			// textValue is the value that will be used as a placeholder in
			// the TextInput to type in things
			textValue: "",
			currentText: "",
			texts: []
		};

		// initiates message on page load and keep polling for new messages
		this.initMessages();

		// registers all the necessary socket events
		this.registerSocketEvents();
	}

	registerSocketEvents() {
		/* Registering all the socket events */

		// socket event for receiving messages broadcasted by the server socket
		this.socket.on(this.rydeObject.rydeId.toString() + "/broadcast", (resObj) => {
			textComponents = [];
			for (let i = 0; i < resObj.texts.length; ++i) {
				// variable names are placed inside {}
				textComponents.push(
					<ListItem avatar>
						<Left>
							<Thumbnail source = {require("./pics/default.png")} />
						</Left>
						<Body>
							<Text>{resObj.texts[i].username}</Text>
							<Text note>{resObj.texts[i].text}</Text>
						</Body>
					</ListItem>
				);
			}

			console.log(resObj.texts.length);
			this.setState({texts: textComponents});
		});

		// socket event for success of a server job
		this.socket.on(this.rydeObject.rydeId.toString() + "/success", () => {
			console.log("Server socket sent success");
		});

		// socket event for failure of a server job
		this.socket.on(this.rydeObject.rydeId.toString() + "/failure", () => {
			console.log("Server socket sent failure...");
		});

	}

	// Retrieves all the messages from the mongodb database and changes
	// the state's text attribute to the object retrieved from mongo db.
	// This function is called only when the page is displayed
	initMessages() {

		// socket emission to send the ryde id to the sever
		// we need to tell the server what id we are and what ryde chat room
		// we belong to
		this.socket.emit("idEnquiry", this.rydeObject.rydeId);


		// this event listener catches the path through which the socket from the
		// server will send the all the messages related to the ride from the database
		this.socket.on(this.rydeObject.rydeId.toString() + "/initMessages", (resObj) => {
			let initMsgs = [];
			for (let i = 0; i < resObj.texts.length; ++i) {
				initMsgs.push(
					<ListItem avatar>
						<Left>
							<Thumbnail source = {require("./pics/default.png")} />
						</Left>
						<Body>
							<Text>{resObj.texts[i].username}</Text>
							<Text note>{resObj.texts[i].text}</Text>
						</Body>
					</ListItem>
				);
			}
			console.log(resObj.texts.length);
			this.setState({texts: initMsgs});
		});

	}


	sendMessage() {
		let reqObj = {
			rydeId: this.rydeObject.rydeId,
			text: this.state.currentText,
			username: this.username
		};

		// now we have to communicate with the server by sending each chat messages
		// and storing the objects in the database
		// socket.emit because we are sending somthing to the server
		this.socket.emit(this.rydeObject.rydeId.toString() + "/storeChat", reqObj);
	}

	render() {
		return (
			<ScrollView>
				<View>
					<List>
						{this.state.texts}
					</List>
				</View>

				<View>
					<Item rounded>
						<Input
							value = {this.state.textValue}
							onChangeText = {(text) => {
								// On press we need to wrap the function this.buttonPress inside an
								// arrow function because this object becomes unknown inside the buttonPress
								// function if not done so. This is because the buttonPress function cannot
								// access the scope of the this object and the this object is something else
								// when assigned to the onPress variable. We also set the placeholder value
								// for the TextInput to whatever is being typed everytime the text changes
								this.setState({currentText: text});
								this.setState({textValue: text});
							}}
							onFocus = {() => {
								// On focus we empty out the placeholder value which is the textValue variable
								// in the react components state. This allows the box to refresh out for another
								// input
								this.setState({textValue: ""});
							}}
						></Input>
					</Item>
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
=======
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
import Config from '../Config/Config';


class Chat extends Component {

	constructor(props) {
		super(props);
		this.userName = "Tanvir";
		// for now rydeObject's id is just a random float, but this id will be
		// the id attribute of an object that gets passed on from another page
		// as the rydeObject will be this.props.rydeObject
		this.rydeObject = {rydeId: 4};
		this.address = Config.ip;
		this.baseUrl = "http://" + this.address + ":3000/"; // https://ryde-matb.herokuapp.com/
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
				let oldTexts = [];
				for (let i = 0; i < reqObj.texts.length; ++i) {
					reqObj.texts[i] = JSON.parse(reqObj.texts[i]);
					// props.children gives access to the parse text directly inside the
					// react component's text attribute
					// the parsed texts from components reaturned by mongodb gets stored
					// in the oldTexts array where we create new text components and use
					// the mongodb texts components parsed texts
					// this is done so because React Native can't render Text components
					// returned by mongodb
					oldTexts.push(<Text>{reqObj.texts[i].props.children}</Text>)
				}
				this.setState({texts: oldTexts});
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
