/* Author: Md. Tanvir Islam */

import React, { Component } from "react";

import {
	AppRegistry,
	ScrollView,
	TouchableOpacity
} from "react-native";

import {  
	View,  
	Card, 
	CardItem,  
	Text,
	Icon
} from 'native-base';

import { Actions } from "react-native-router-flux";

import styles from "./styles";

import config from "./../../config";

import Swipeout from "react-native-swipe-out";

import CardSlide from "./CardSlide";

class RequestedRides extends Component {
	constructor(props) {
		super(props);
		this.address = config.ip;
		this.user = this.props.resObj;
		// database is queryed with the driver's email and the database that is
		// queried is PersonalRydes database
		//this.user = {email: "ameeraam13@hotmail.com"};
		this.baseUrl = "http://" + this.address + ":3000/";
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
			pendingPassengers: []
		}
		this.passengerIndex = 0;
		this.getPassengerRequests();

		// THIS IS IMPORTANT
		// this.acceptPassenger is our function within that class you can pass function logic from one 
		// from one scope to another by passing it in as a prop
		// when it is passed in as a prop the this variable inside the function changes to whatever
		// scope you are passing the function to
		// This is when .bing(this); comes into place, what .bind(this) does is whenever it is called it
		// forever binds the scope where .bind(this) is called to the function for life. Now no matter how
		// many times the function is passed around from and to different component, the this variable will
		// always be the this of the scope where .bind(this) was called 
		// Whenever you do .bind(this); the function this.acceptPassenger
		this.acceptPassenger = this.acceptPassenger.bind(this);
		this.rejectPassenger = this.rejectPassenger.bind(this);

	}

	// we query to get the passengers who have applied to our rydes
	getPassengerRequests() {
		// we sent a query string to the server with the email of the driver
		fetch(this.baseUrl + this.user.email + "/getPassengerRequests", {
			method: "GET"
		}).then((res) => {
			// response object being returned
			if (res.status === 200) {
				resPromise = res.json();
				resPromise.then((resObj) => {
				// the response object will look something like this:
				// resObj = {"1": [firstName: "Brian", lastName: "West", email: "brianwest@ryde.com", dob: "12/12/1994", phone: "615897446", …], "2": [], "3": []}
				// where "1", "2", "3" are the keys of the object which are the id's of the different rydes posted by the driver
				let rydeKeys = Object.keys(resObj);

				// rydeKeys will be an array of keys in the resObj

				// what we do here is we obtain all the keys of the response object and put it in an array
				// after that we populate the pending passengers using these information

				// this.state.pendingPassengers will be set to this value after the loop
				let passengers = [];
				for (let i = 0; i < rydeKeys.length; ++i) {
					// we extract the array containing all the passengers of a specific ryde
					let requestsPerRydeObject = resObj[rydeKeys[i]];

					// we loop over the requestsPerRydeObject array and append it to the state making a slidable card
					for (let j = 0; j < requestsPerRydeObject.length; ++j) {
						passengers.push(
							<CardSlide key = {i} acceptPassenger = {this.acceptPassenger} rejectPassenger = {this.rejectPassenger} id = {rydeKeys[i]} firstName = {requestsPerRydeObject[j].firstName} lastName = {requestsPerRydeObject[j].lastName} email = {requestsPerRydeObject[j].email} rating = {requestsPerRydeObject[j].rating} />
						);
					}
				}
				this.setState({pendingPassengers: passengers});
				}, (err) => {
					alert("Promise error");
				});
			} else {
				alert("Server error");
			}
		}, (err) => {
			alert("Promise error");
		});
	}

	// self is the this of the child component
	acceptPassenger(self) {
		let passengers = this.state.pendingPassengers;

		for (let i = 0; i < passengers.length; ++i) {
			// we loop over the passengers array and check if one of the elements id
			// actually matches the id of the component selected
			if (passengers[i].props.id === self.props.id) {
				// returns an array of elements that are being removed
				var cardObjArr = passengers.splice(i, 1);
			}
		}
		this.setState({pendingPassengers: passengers});

		// now we send this array of passengers to the server for the server
		// to update the personalRyde objects

		let reqObj = {
			rydeId: cardObjArr[0].props.id,
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
				alert("Server error");
			}
		}, (err) => {
			alert("Promise error");
		});

	}

	// self is the this of the child component
	rejectPassenger(self) {
		let passengers = this.state.pendingPassengers;

		for (let i = 0; i < passengers.length; ++i) {
			// we loop over the passengers array and check if one of the elements id
			// actually matches the id of the component selected
			if (passengers[i].props.id === self.props.id) {
				// returns an array of elements being removed
				var cardObjArr = passengers.splice(i, 1);
			}
		}
		this.setState({pendingPassengers: passengers});
	
		// now we need to send this array of passengers to the server for the 
		// server to update the personalRyde objects


		let reqObj = {
			rydeId: cardObjArr[0].props.id,
			rejectedPassengerEmail: cardObjArr[0].props.email
		}

		fetch(this.baseUrl + this.user.email + "/rejectedUpdatedRydes", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		});

	}

	render() {
		return(
			<ScrollView>
				{this.state.pendingPassengers}
			</ScrollView>
		);
	}
}

module.exports = RequestedRides;

AppRegistry.registerComponent("RequestedRides", () => RequestedRides);