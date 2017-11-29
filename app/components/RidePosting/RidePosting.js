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
	TouchableOpacity,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import {
	Actions
} from 'react-native-router-flux';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";
import { Container, Header, Left, Icon, Body, Button, Right, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem, Item, Input, Toast, Picker} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

// Main class
class RidePosting extends Component{

	constructor(props){
		super(props);
		this.baseUrl = config();
		this.openMenu = this.openMenu.bind(this);
		this.openNotifications = this.openNotifications.bind(this);
		this.state = {
			fromLocation: "From",
			toLocation: "To",
			travelDate: "Date",
			numPassengers: "Passenger Spots",
			numLuggage: "Luggage Space",
			ridePrice: "Price",
			loading: false,
			showToast: false,
			isDateTimePickerVisible: false
		}
	}

	openNotifications(){
		this.notifications.openDrawer();
	}

	openMenu() {
		this.drawer.openDrawer();
	}

	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	_handleDatePicked = (date) => {

		this.userMs = date.getTime();

		let day = date.getDate();
		// the month that you get is from 0 to 11
		let month = date.getMonth() + 1;
		let year = date.getFullYear();

		let formattedDate = day + "/" + month + "/" + year;
		this.setState({travelDate: formattedDate});
    	// console.log('Your Date of Birth is: ', date);
    	this._hideDateTimePicker();

	}


	// MAKE INPUTS LOWERCASE FOR ROBUSTNESS WHEN SEARCHING, or lowercase it when doing comparisons server side so data
	// doesnt get affected

	// Code for functionality of the Post button on the app page
	postButton(){
		this.setState({loading: true});

		let sameDestination = {dest:[]};
		let newRydeID = {query: "databaseID", rydeID: 0};
		let resObj = this.props.resObj;

		// Getting the current RydeID to assign to Ryde being posted
		fetch(this.baseUrl + "getRydeID", {

			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newRydeID)

		}).then((res) => {
			this.setState({loading: false});

			let resObjPromise = res.json();

			resObjPromise.then((resObjRydeID) => {

				newRydeID.rydeID = resObjRydeID.rydeID;

				let reqObj = {
					driver: this.props.resObj.email,
					firstName: this.props.resObj.firstName,
					lastName: this.props.resObj.lastName,
					from: this.state.fromLocation,
					to: this.state.toLocation,
					date: this.state.travelDate,
					numPassengers: this.state.numPassengers,
					numLuggage: this.state.numLuggage,
					rydeId: newRydeID.rydeID,
					pending: [],
					members: [],
					currentPassengerCount: 0,
					currentLuggageCount: 0,
					price: "$" + this.state.ridePrice
				}

				this.setState({loading: true});
				// Adding Ryde to the Database
				fetch(this.baseUrl + "postRyde", {

					method: "POST",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify(reqObj)

				}).then((res) => {
					this.setState({loading: false});
					if (res.status === 200){
						this.setState({loading: true});

						Toast.show({
										text: 'Ryde Posted!',
										position: 'top',
										buttonText: 'Okay',
										type: 'success',
										duration: 3000
									});

						fetch(this.baseUrl + "incrementRydeID", {

							method: "POST",
							headers: {
								"Accept": "application/json",
								"Content-Type": "application/json"
							},
							body: JSON.stringify(newRydeID)

						}).then((res) => {
							this.setState({loading: false});

							if (res.status === 200){

							} else {

								console.log("RydeID failed to increment");
							}
						}, (err) => {

							Toast.show({
											text: 'Server Error with Ryde ID',
											position: 'top',
											buttonText: 'Okay',
											duration: 3000
										});
						});

						Actions.driverView({resObj});

					} else {
						Toast.show({
									text: 'Server sent an error',
									position: 'top',
									buttonText: 'Okay',
									duration: 3000
								});
					}
				}, (err) => {
					Toast.show({
									text: 'Promise Error:\nUnhandled promise',
									position: 'top',
									buttonText: 'Okay',
									duration: 3000
								});
				});
			})

		}, (err) => {

			console.log("Error getting Ryde ID");
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
						<Header style={{backgroundColor: 'rgb(0, 51, 153)'}}>
							<Left style={{flex: 1}}>
								<Button transparent onPress={this.openMenu}>
									<Icon name='menu' />
								</Button>
							</Left>
							<Body style={{alignItems: 'center', flex: 1}}>
								<Title style={{fontFamily: 'sans-serif'}}>Post</Title>
							</Body>
							<Right style={{flex: 1}}>
								<Button onPress = {() => {this.openNotifications()}} transparent>
									<Icon name='notifications' />
								</Button>
							</Right>
						</Header>

						<Content contentContainerStyle={styles.mainStyle}>
							{/*Instruction Text*/}

							{/*Input box for the from location*/}
							<Item style = {styles.inputBox}>
							<Icon active name='pin' />
							<Input
								placeholder = {this.state.fromLocation}
								onChangeText = {(text) => this.setState({fromLocation: text})}
								/>
							</Item>
							{/*Input box for the to location*/}
							<Item style = {styles.inputBox}>
							<Icon active name='pin' />
							<Input
								placeholder = {this.state.toLocation}
								onChangeText = {(text) => this.setState({toLocation: text})}
								/>
							</Item>
							{/*Input box for the travel date*/}

							<Item style = {styles.inputBox} onPress={this._showDateTimePicker}>
								<Icon active name ='calendar'/>
								<Text style={{fontSize: 18}}> {this.state.travelDate}</Text>
							</Item>

							<DateTimePicker
								isVisible={this.state.isDateTimePickerVisible}
								onConfirm={this._handleDatePicked}
								onCancel={this._hideDateTimePicker}
						 />

							{/*Input box for the number of passengers*/}
							<Item style = {styles.inputBox}>
							<Icon active name='contacts' />
							<Input
								placeholder = {this.state.numPassengers}
								onChangeText = {(text) => this.setState({numPassengers: text})}
								/>
							</Item>

							{/*Input box for the amount of luggage*/}
							<Item style = {styles.inputBox}>
							<Icon active name='briefcase' />
							<Input
								placeholder = {this.state.numLuggage}
								onChangeText = {(text) => this.setState({numLuggage: text})}
								/>
							</Item>

							{/*Input box for the price of each seat*/}
							<Item style = {styles.inputBox}>
							<Icon active name='cash' />
							<Input
								placeholder = {this.state.ridePrice}
								onChangeText = {(text) => this.setState({ridePrice: text})}
								/>
							</Item>

							{/*Button to use the postButton function with an image being used for the button*/}
							<TouchableOpacity onPress = {() => {this.postButton()}} style = {{width: 280}}>
								<Text style = {styles.submitButtonOnPost}> Post </Text>
							</TouchableOpacity>

							{this.state.loading && <View style = {styles.loading}>
							<ActivityIndicator
							animating
							size="large"
							color="red"
							/>
							</View>}
						</Content>

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
		backgroundColor: 'white'

	},
	backgroundImage: {
		width: 200,
		height: 100,
		marginTop: 10
	},
	logo: {
		alignSelf: 'center',
		width: 50,
		height: 50,

	},
	content: {
		alignItems: 'center',
		backgroundColor: 'white',

	},
	inputBox: {
		height: 40,
		width: 250,
		marginTop: 5
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

	submitButtonOnPost: {
		backgroundColor:'rgb(0, 51, 153)',
		textAlign:'center',
		height:54,
		color:'#fff',
		fontSize:18,
		paddingTop:14,
		fontFamily: 'sans-serif',
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10
	},
	loading: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, .2)"
	}
});

module.exports = RidePosting;
AppRegistry.registerComponent("RidePosting", () => RidePosting);
