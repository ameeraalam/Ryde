// Imports required for this page
import React, { Component } from "react";
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	Alert,
	TextInput,
	TouchableOpacity
} from 'react-native';
import {
	Actions
} from 'react-native-router-flux';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";
import { Container, Header, Left, Icon, Body, Button, Right, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';

// Unique static ID that will be assigned to a Ryde each time one is created
var rideNum = 1;
var emptyArray = [];

// Main class
class RidePosting extends Component{

	constructor(props){
		super(props);
		this.address = config.ip;
		this.baseUrl = "http://" + this.address + ":3000/";
		this.openMenu = this.openMenu.bind(this);
		this.openNotifications = this.openNotifications.bind(this);
		this.state = {
			fromLocation: "From:",
			toLocation: "To:",
			travelDate: "Date: (DD/MM)",
			numPassengers: "Passenger Spots:",
			numLuggage: "Luggage Space:",
			ridePrice: "Price per seat:"
		}
	}

	openNotifications(){
		this.notifications.openDrawer();
	}

	openMenu() {
		this.drawer.openDrawer();
	}


	// MAKE INPUTS LOWERCASE FOR ROBUSTNESS WHEN SEARCHING, or lowercase it when doing comparisons server side so data
	// doesnt get affected

	// Code for functionality of the Post button on the app page
	postButton(){
		let resObj = this.props.resObj;

		let reqObj = {
			driver: this.props.resObj.email,
			firstName: this.props.resObj.firstName,
			lastName: this.props.resObj.lastName,
			from: this.state.fromLocation,
			to: this.state.toLocation,
			date: this.state.travelDate,
			numPassengers: this.state.numPassengers,
			numLuggage: this.state.numLuggage,
			rydeId: rideNum,// Needs to become a server side variable
			pending: emptyArray,
			members: emptyArray,
			currentPassengerCount: 0,
			currentLuggageCount: 0,
			price: "$" + this.state.ridePrice
		}

		fetch(this.baseUrl + "postRyde",{
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {
			if (res.status === 200){
				// Need to pass user Obj here
				Actions.driverView({resObj});
			} else {
				alert("Connection error");
			}
		}, (err) => {

			alert("Server Error");
		});
	}

	// App visuals
	render(){

		return(

			<Notifications
				ref={(notifications) => (this.notifications = notifications)}>
				<Drawer
					ref={(drawer) => this.drawer = drawer}>
					<Container>
						<Header style={{backgroundColor: 'rgb(72, 110, 255)'}}>
							<Left style={{flex: 1}}>
								<Button transparent onPress={this.openMenu}>
									<Icon name='menu' />
								</Button>
							</Left>
							<Body style={{alignItems: 'center', flex: 1}}>
								<Title style={{fontFamily: 'sans-serif'}}>RYDE POST</Title>
							</Body>
							<Right style={{flex: 1}}>
								<Button onPress = {() => {this.openNotifications()}} transparent>
									<Icon name='notifications' />
								</Button>
							</Right>
						</Header>
						<View style = {styles.mainStyle}>

							{/*Instruction Text*/}
							<Text style = {styles.welcome}>
								Post Your Ryde
							</Text>

							{/*Input box for the from location*/}
							<TextInput
								style = {styles.inputBox}
								placeholder = {this.state.fromLocation}
								onChangeText = {(text) => this.setState({fromLocation: text})}
								/>

							{/*Input box for the to location*/}
							<TextInput
								style = {styles.inputBox}
								placeholder = {this.state.toLocation}
								onChangeText = {(text) => this.setState({toLocation: text})}
								/>

							{/*Input box for the travel date*/}
							<TextInput
								style = {styles.inputBox}
								placeholder = {this.state.travelDate}
								onChangeText = {(text) => this.setState({travelDate: text})}
								/>

							{/*Input box for the number of passengers*/}
							<TextInput
								style = {styles.inputBox}
								placeholder = {this.state.numPassengers}
								onChangeText = {(text) => this.setState({numPassengers: text})}
								/>

							{/*Input box for the amount of luggage*/}
							<TextInput
								style = {styles.inputBox}
								placeholder = {this.state.numLuggage}
								onChangeText = {(text) => this.setState({numLuggage: text})}
								/>

							{/*Input box for the price of each seat*/}
							<TextInput
								style = {styles.inputBox}
								placeholder = {this.state.ridePrice}
								onChangeText = {(text) => this.setState({ridePrice: text})}
								/>

							{/*Button to use the postButton function with an image being used for the button*/}
							<TouchableOpacity onPress = {() => {this.postButton()}}>
								<Text>
									Post
								</Text>
							</TouchableOpacity>

						</View>
					</Container>
				</Drawer>
			</Notifications>

		);
	}
}


// Styling
const styles = StyleSheet.create({

	mainStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},

	inputBox: {
		height: 40,
		width: 200,
		borderColor: '#000000',
		borderWidth: 1
	},

	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: '#000000',
	},

	instructions: {
		textAlign: 'center',
		color: '#FFFFFF',
		marginBottom: 5,
	},
});

module.exports = RidePosting;
AppRegistry.registerComponent("RidePosting", () => RidePosting);
