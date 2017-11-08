// Imports required for this page
import React, { Component } from "react";
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	Alert,
	TextInput,
	TouchableOpacity
} from 'react-native';
import {
	Actions
} from 'react-native-router-flux';

import config from "./../../config";
import { Container, Header, Left, Icon, Body, Right, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';

// Unique static ID that will be assigned to a Ryde each time one is created
var rideNum = 1;
var emptyArray = [];

// Main class
class RidePosting extends Component{

	constructor(props){
		super(props);
		this.address = config.ip;
		this.baseUrl = "http://" + this.address + ":3000/";
		this.state = {
			fromLocation: "From:",
			toLocation: "To:",
			travelDate: "Date: (DD/MM)",
			numPassengers: "Passenger Spots:",
			numLuggage: "Luggage Space:",
			ridePrice: "Price per seat:"
		}
	}


	// MAKE INPUTS LOWERCASE FOR ROBUSTNESS WHEN SEARCHING, or lowercase it when doing comparisons server side so data
	// doesnt get affected

	// Code for functionality of the Post button on the app page
	postButton(){
		
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

			let resObjPromise = res.json();

			resObjPromise.then((resObj) => {

				console.log("resObj.rydeID = " + resObj.rydeID);
				newRydeID.rydeID = resObj.rydeID;

				// Adding Ryde to the Database
				fetch(this.baseUrl + "postRyde", {
					
					method: "POST",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify(reqObj)

				}).then((res) => {
					
					if (res.status === 200){

						alert("Ryde Posted!");

						fetch(this.baseUrl + "incrementRydeID", {
							
							method: "POST",
							headers: {
								"Accept": "application/json",
								"Content-Type": "application/json"
							},
							body: JSON.stringify(newRydeID)
						
						}).then((res) => {
							
							if (res.status === 200){
								console.log("RydeID incremented");
							
							} else {
							
								console.log("RydeID failed to increment");
							}	
						}, (err) => {
							
							alert("Server Error with Ryde ID");
						});

						Actions.driverview({resObj});

					} else {
						
						alert("Server Error!");
					}
				}, (err) => {

					alert("Server Error!");
				});
			})
			 
		}, (err) => {

			console.log("Error getting Ryde ID");	
		});
	}

	// App visuals
	render(){
		
		return(
			
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
					<Image
						source = {require("./images/postImage.jpg")}
					/>
				</TouchableOpacity>
			
			</View>
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