import React, { Component } from "react";
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
	Title,
	Badge
} from "native-base";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	ScrollView,
	TouchableOpacity,
	StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import clientIO from "socket.io-client";
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config"

class Chat extends Component {

	constructor(props) {
		super(props);
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
		this.setBadge = this.setBadge.bind(this);
		this._Mounted = false;
		this.state = {
			placeBadge: false,
			// textValue is the value that will be used as a placeholder in
			// the TextInput to type in things
			textValue: "",
			texts: []
		};
	}


	openNotifications(){
		this.notifications.openDrawer();
	}

	openMenu() {
		this.drawer.openDrawer();
	}


	setBadge(num) {
    if(num > 0){
			if(this._Mounted){
       	this.setState({placeBadge: true});
			}
    } else {
			if(this._Mounted){
	      this.setState({placeBadge: false});
			}
		}
  }


	componentDidMount() {
		this._Mounted = true;
		console.ignoredYellowBox = [ // if you still get the mounted warning, put this in componentDidMount
			'Setting a timer'
		];
		// initiates message on page load and keep polling for new messages
		this.initMessages();

		// registers all the necessary socket events
		this.registerSocketEvents();
	}

	registerSocketEvents() {
		/* Registering all the socket events */

		// socket event for receiving messages broadcasted by the server socket
		this.socket.on(this.rydeObject.rydeId.toString() + "/broadcast", (resObj) => {
			if(this._Mounted) {
				this.setState({texts: resObj.texts});
			}
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
			if(this._Mounted) {
				this.setState({texts: resObj.texts});
			}
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
		this._Mounted = false;
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
		};

		// now we have to communicate with the server by sending each chat messages
		// and storing the objects in the database
		// socket.emit because we are sending somthing to the server
		this.socket.emit(this.rydeObject.rydeId.toString() + "/storeChat", reqObj);

	}

	render() {
		let displayBadge = (<Badge style={{ position: 'absolute', right: 14, top: 9, paddingTop: 0,
      paddingBottom: 0, borderRadius: 100, height: 11, zIndex: 1 }}/>)

		return (
			<Notifications
				badgeFunc = {this.setBadge}
				isPassenger={this.props.isPassenger}
				resObj = {this.props.resObjUser}
				driverFilledObj = {this.props.driverFilledObj}
				ref={(notifications) => (this.notifications = notifications)}>
				<Drawer
					isPassenger={this.props.isPassenger}
					resObj = {this.props.resObjUser}
					driverFilledObj = {this.props.driverFilledObj}
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
								<Button badge onPress = {() => {this.openNotifications()}} transparent>
									{this.state.placeBadge && displayBadge}
									<Icon name='notifications' />
								</Button>
							</Right>
						</Header>
						<View style={{flex: 1, backgroundColor:'#fff'}}>
						<GiftedChat
							messages = {this.state.texts}
							onSend = {(message) => {
								// message argument seems to be an array containing exactly one element
								// which is a GiftedChat object
								this.sendMessage(message);
							}}
							user = {{
								_id: this.id,
								name: this.username
							}}
							/>
						</View>
					</Container>
				</Drawer>
			</Notifications>


		);
	}

}

module.exports = Chat;

AppRegistry.registerComponent("Chat", () => Chat);
