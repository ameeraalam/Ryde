import React, { Component } from "react";
<<<<<<< HEAD
import { GiftedChat } from "react-native-gifted-chat";
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
	Button,
	Left,
	Right,
	Thumbnail,
	Icon,
	Title
=======
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
>>>>>>> master
} from "native-base";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
<<<<<<< HEAD
	ScrollView,
	TouchableOpacity,
	StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import clientIO from "socket.io-client"; /////?????????Add drawer and notification???????????///////////////////////////////////////////////////////////
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
=======
	Button,
	ScrollView,
	TouchableOpacity
} from "react-native";

import { Actions } from "react-native-router-flux";

import styles from "./styles";

import clientIO from "socket.io-client";

>>>>>>> master
import config from "./../../config"

class Chat extends Component {

	constructor(props) {
		super(props);
<<<<<<< HEAD
		this.openMenu = this.openMenu.bind(this);
		this.openNotifications = this.openNotifications.bind(this);
		this.username = this.props.resObjUser.firstName + " " + this.props.resObjUser.lastName;
		this.id = this.props.resObjUser.id;
		// for now rydeObject's id is just an int, but this id will be
		// the id attribute of an object that gets passed on from another page
		// as the rydeObject will be this.props.rydeObject
		this.rydeObject = this.props.resObjRyde;
		this.baseUrl = config();
		// creating the socket object specific to this client
		this.socket = clientIO(config());
		this.initMessages = this.initMessages.bind(this);
		this.registerSocketEvents = this.registerSocketEvents.bind(this);
=======
		this.username = "Tanvir";
		// for now rydeObject's id is just a random float, but this id will be
		// the id attribute of an object that gets passed on from another page
		// as the rydeObject will be this.props.rydeObject
		this.rydeObject = {rydeId: 4};
		this.address = config.ip;
		this.baseUrl = "http://" + this.address + ":3000/";
		// creating the socket object specific to this client
		this.socket = clientIO("http://" + this.address + ":3000/");
>>>>>>> master
		this.state = {
			// textValue is the value that will be used as a placeholder in
			// the TextInput to type in things
			textValue: "",
<<<<<<< HEAD
			texts: []
		};
	}

	openNotifications(){
		this.notifications.openDrawer();
	}

	openMenu() {
		this.drawer.openDrawer();
	}

	componentWillMount() {
		console.ignoredYellowBox = [ // if you still get the mounted warning, put this in componentDidMount
			'Setting a timer'
		];
=======
			currentText: "",
			texts: []
		};

>>>>>>> master
		// initiates message on page load and keep polling for new messages
		this.initMessages();

		// registers all the necessary socket events
		this.registerSocketEvents();
	}

	registerSocketEvents() {
		/* Registering all the socket events */

		// socket event for receiving messages broadcasted by the server socket
		this.socket.on(this.rydeObject.rydeId.toString() + "/broadcast", (resObj) => {
<<<<<<< HEAD
			this.setState({texts: resObj.texts});
=======
			textComponents = [];
			for (let i = 0; i < resObj.texts.length; ++i) {
				// variable names are placed inside {}
				textComponents.push(
					<ListItem key = {i} avatar>
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
			this.setState({texts: textComponents});
>>>>>>> master
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
<<<<<<< HEAD

=======
	
>>>>>>> master
		// socket emission to send the ryde id to the sever
		// we need to tell the server what id we are and what ryde chat room
		// we belong to
		this.socket.emit("idEnquiry", this.rydeObject.rydeId);

<<<<<<< HEAD
		// this event listener catches the path through which the socket from the
		// server will send the all the messages related to the ride from the database
		this.socket.on(this.rydeObject.rydeId.toString() + "/initMessages", (resObj) => {
			this.setState({texts: resObj.texts});
		});

	}

	// All the events registered to a React DOM element that manipulate that
	// particular DOM element must be unregistered whenever the DOM element gets
	// unmounted. When a DOM element in react gets unmounted, it essentially gets
	// popped of the stack and gets destroyed, but the event listeners are still
	// attached to that React DOM element and when these event listeners get
	// triggered they try to manipulate a DOM element that does not exist.
	// Example of how to unregister events:

componentWillUnmount() {
	this.socket.off(this.rydeObject.rydeId.toString() + "/broadcast");
	this.socket.off(this.rydeObject.rydeId.toString() + "/success");
	this.socket.off(this.rydeObject.rydeId.toString() + "/failure");
	this.socket.off(this.rydeObject.rydeId.toString() + "/initMessages");
}


	sendMessage(message = []) {

		GiftedChat.append(this.state.texts, message);

		let reqObj = {
			rydeId: this.rydeObject.rydeId,
			text: message[0]
=======

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
>>>>>>> master
		};

		// now we have to communicate with the server by sending each chat messages
		// and storing the objects in the database
		// socket.emit because we are sending somthing to the server
		this.socket.emit(this.rydeObject.rydeId.toString() + "/storeChat", reqObj);
<<<<<<< HEAD

=======
>>>>>>> master
	}

	render() {
		return (
<<<<<<< HEAD
			<Notifications
				ref={(notifications) => (this.notifications = notifications)}>
				<Drawer
					ref={(drawer) => this.drawer = drawer}>
					<Container>
						<Header style={{backgroundColor: 'rgb(72, 110, 255)'}}>
							<StatusBar
								backgroundColor="rgb(72, 110, 255)"
								barStyle="light-content"
								hidden = {false}
								/>
							<Left style = {{flex: 1}}>
								<Button transparent onPress={this.openMenu}>
									<Icon name='menu' />
								</Button>
							</Left>
							<Body style={{flex: 1}}>
								<Title style={{fontFamily: 'sans-serif'}}>DASHBOARD</Title>
							</Body>
							<Right style = {{flex: 1}}>
								<Button onPress = {() => {this.openNotifications()}} transparent>
									<Icon name='notifications' />
								</Button>
							</Right>
						</Header>
			<GiftedChat
				messages = {this.state.texts}
				onSend = {(message) => {
					// message argument seems to be an array containing exactly one element
					// which is an GiftedChat object
					this.sendMessage(message);
				}}
				user = {{
					_id: this.id,
					name: this.username
				}}
			/>
		</Container>
	</Drawer>
</Notifications>


=======
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
>>>>>>> master
		);
	}

}

module.exports = Chat;

<<<<<<< HEAD
AppRegistry.registerComponent("Chat", () => Chat);
=======
AppRegistry.registerComponent("Chat", () => Chat);
>>>>>>> master
