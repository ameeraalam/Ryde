/* Author: Md. Tanvir Islam */

import React, { Component } from "react";

import {
	AppRegistry,
	ScrollView,
	TouchableOpacity,
	BackHandler,
	ActivityIndicator
} from "react-native";

import {
	View,
	Card,
	CardItem,
	Text,
	Icon,
	Container,
	Header,
	Left,
	Body,
	Button,
	Right,
	Title,
	Toast,
	Content
} from 'native-base';

import { Actions } from "react-native-router-flux";

import styles from "./styles";
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";

import CardSlide from "./CardSlide";

class RequestedRides extends Component {
	constructor(props) {
		super(props);
		this.user = this.props.resObjUser;
		this.baseUrl = config();
		this.openMenu = this.openMenu.bind(this);
		this.openNotifications = this.openNotifications.bind(this);
		this.swipeOutButtons = [{
			text: "Accept",
			backgroundColor: "#86e079",
			onPress: () => {this.acceptPassenger()}
		}, {
			text: "Reject",
			backgroundColor: "#e54747",
			onPress: () => {this.rejectPassenger()}
		}];
		this.state = {
			pendingPassengers: [],
			loading: false,
			showToast: false
		}
		this.passengerIndex = 0;

		// THIS IS IMPORTANT
		// this.acceptPassenger is our function within that class you can pass function logic from one
		// from one scope to another by passing it in as a prop
		// when it is passed in as a prop the this variable inside the function changes to whatever
		// scope you are passing the function to
		// This is when .bind(this); comes into place, what .bind(this) does is whenever it is called it
		// forever binds the scope where .bind(this) is called to the function for life. Now no matter how
		// many times the function is passed around from and to different component, the this variable will
		// always be the this of the scope where .bind(this) was called
		// Whenever you do .bind(this); the function this.acceptPassenger
		this.acceptPassenger = this.acceptPassenger.bind(this);
		this.rejectPassenger = this.rejectPassenger.bind(this);

	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			// this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
			// Typically you would use the navigator here to go to the last state.

			this.goBack();
			return true;

		});

		//this.getPassengerRequests();

	}

	goBack() {

		fetch(this.baseUrl + this.props.resObjRyde.rydeId + "/getUpdatedRyde").then((res) => {

	    	if (res.status === 200) {
				let resPromise = res.json();
				resPromise.then((resObj) => {
					// we set the new ryde object
				  let resObjDriver = this.props.resObjUser;
					let resObjRide = resObj;

					//****** when you do actions.pop, it pops the current page off the stack but since we do refresh inside the pop it refreshes the previous page with the new props being passed

					Actions.pop();
					Actions.refresh({resObjDriver, resObjRide});
					/*Actions.pop();
					setTimeout(() => {
						Actions.refresh({resObjDriver, resObjRide});
					}, 0);*/

					//Actions.pop({refresh: {resObjDriver, resObjRide}});
					//Actions.driverRideProfile({resObjDriver, resObjRide});

	        	})
			} else {
						Toast.show({
							text: 'Server returned an Error',
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
	}

	openNotifications(){
		this.notifications.openDrawer();
	}

	openMenu() {
		this.drawer.openDrawer();
	}


	// we query to get the passengers who have applied to our rydes
	/*getPassengerRequests() {
		// we sent a query string to the server with the email of the driver
		fetch(this.baseUrl + this.user.email + "/getPassengerRequests", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({rydeId: this.props.resObjRyde.rydeId})
		}).then((res) => {
			// response object being returned
			if (res.status === 200) {
				resPromise = res.json();
				resPromise.then((resObj) => {


					// holds the array of cards with the details with passengers requesting to join the ride
					let passengers = [];

					for (let i = 0; i < resObj.pending.length; ++i) {
						passengers.push(<CardSlide id = {i} key = {i} acceptPassenger = {this.acceptPassenger} rejectPassenger = {this.rejectPassenger} rydeId = {this.props.resObjRyde.rydeId} firstName = {resObj.pending[i].firstName} lastName = {resObj.pending[i].lastName} email = {resObj.pending[i].email} rating = {resObj.pending[i].rating} />)
					}

					this.setState({pendingPassengers: passengers});

				}, (err) => {
					Toast.show({
						text: 'Promise Error:\nUnhandled promise',
						position: 'top',
						buttonText: 'Okay',
						duration: 3000
					});
				});
			} else {
				Toast.show({
					text: 'Server Error',
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
	}*/

	componentWillMount() {
		// holds the array of cards with the details with passengers requesting to join the ride

		let passengers = [];

		let pending = this.props.resObjRyde.pending;

		for (let i = 0; i < pending.length; ++i) {
			passengers.push(<CardSlide id = {i} key = {i} acceptPassenger = {this.acceptPassenger} rejectPassenger = {this.rejectPassenger} rydeId = {this.props.resObjRyde.rydeId} firstName = {pending[i].firstName} lastName = {pending[i].lastName} email = {pending[i].email} rating = {pending[i].rating} />)
		}

		this.setState({pendingPassengers: passengers});
	}

	// self is the this of the child component
	acceptPassenger(self) {
		// now we send this array of passengers to the server for the server
		// to update the personalRyde objects
		let passengers = this.state.pendingPassengers;

		for (let i = 0; i < passengers.length; ++i) {
			// we loop over the passengers array and check if one of the elements id
			// actually matches the id of the component selected
			if (passengers[i].props.id === self.props.id) {
				// returns an array of elements that are being removed
				var cardObjArr = passengers.splice(i, 1);
				break;
			}
		}

		this.setState({pendingPassengers: passengers});

		let reqObj = {
			rydeId: cardObjArr[0].props.rydeId,
			// carObjArr contains the array of cards being accepted
			// and we access the email from the props of the card
			acceptedPassengerEmail: cardObjArr[0].props.email
		}

		fetch(this.baseUrl + this.user.email + "/acceptedUpdatedRydes", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {
			if (res.status === 404) {
				Toast.show({
					text: 'Server Error',
					position: 'top',
					buttonText: 'Okay',
					duration: 3000
				});
			} else if(res.status === 200) {
				Toast.show({
					text: 'Passenger has been added to the ryde',
					position: 'top',
					buttonText: 'Okay',
					duration: 3000
				});
			} else {
				Toast.show({
					text: 'The ryde cannot take in anymore passengers',
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


	}

	// self is the this of the child component
	rejectPassenger(self) {
		// now we need to send this array of passengers to the server for the
		// server to update the personalRyde objects
		let passengers = this.state.pendingPassengers;

		for (let i = 0; i < passengers.length; ++i) {
			// we loop over the passengers array and check if one of the elements id
			// actually matches the id of the component selected
			if (passengers[i].props.id === self.props.id) {
				// returns an array of elements being removed
				var cardObjArr = passengers.splice(i, 1);
				break;
			}
		}

		this.setState({pendingPassengers: passengers});

		let reqObj = {
			rydeId: cardObjArr[0].props.rydeId,
			rejectedPassengerEmail: cardObjArr[0].props.email
		}

		this.setState({loading: true});
		fetch(this.baseUrl + this.user.email + "/rejectedUpdatedRydes", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {
			this.setState({loading: false});
			if (res.status !== 200) {
				Toast.show({
					text: 'Server Error',
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

	}

	render() {
		return(
			<Notifications
				ref={(notifications) => (this.notifications = notifications)}>
				<Drawer
					ref={(drawer) => this.drawer = drawer}>
					<Container style={{backgroundColor: 'white'}}>
						<Header style={{backgroundColor: 'rgb(0, 51, 153)'}}>
							<Left style={{flex: 1}}>
								<Button transparent onPress={this.openMenu}>
									<Icon name='menu' />
								</Button>
							</Left>
							<Body style={{alignItems: 'center', flex: 1}}>
								<Title style={{fontFamily: 'sans-serif'}}>View Requests</Title>
							</Body>
							<Right style={{flex: 1}}>
								<Button onPress = {() => {this.openNotifications()}} transparent>
									<Icon name='notifications' />
								</Button>
							</Right>
						</Header>
						<Content>
							{this.state.pendingPassengers}
						</Content>

						{this.state.loading && <View style = {styles.loading}>
						<ActivityIndicator
						animating
						size="large"
						color="red"
						/>
						</View>}

					</Container>
				</Drawer>
			</Notifications>

		);
	}
}

module.exports = RequestedRides;

AppRegistry.registerComponent("RequestedRides", () => RequestedRides);
