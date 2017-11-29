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
<<<<<<< HEAD
import { Container, Header, Left, Icon, Body, Right, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';

import config from "./../../config";
=======
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46

// Main class
class RideSearch extends Component{

	constructor(props){
		super(props);
<<<<<<< HEAD
		this.address = config.ip;
=======
		this.address = "192.168.0.1";
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
		this.baseUrl = "http://" + this.address + ":3000/";
		this.state = {
			fromLocation: "From:",
			toLocation: "To:",
			travelDate: "Date: (DD/MM)",
			numPassengers: "Amount of Passengers:",
			numLuggage: "Amount of Luggage:"
		}
	}

	// Code for functionality of the Find button on the app page
	findButton(){

<<<<<<< HEAD
		let passedResObj = this.props.resObj;

=======
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
		let reqObj = {
			from: this.state.fromLocation,
			to: this.state.toLocation,
			date: this.state.travelDate,
			passengers: this.state.numPassengers,
			luggage: this.state.numLuggage
		}

<<<<<<< HEAD
		fetch(this.baseUrl + "findRyde", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {

			if (res.status === 200){

				let resObjPromise = res.json();

				resObjPromise.then((resObj) => {
					
					Actions.rideBrowser({passedResObj, resObj})
				})
			} else {

				alert("Error encountered!");
			}
		}, (err) => {
			alert(err);
		});
=======
		fetch(this.baseUrl + "", {
			method: "GET",
			headers: {
				"Accept:": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify
		});

		// get object back

		// pass into here
		Actions.rydeBrowser({});
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
	}

	// App visuals
	render(){

		return(

			<View style = {styles.mainStyle}>
				
				{/*Instruction Text*/}
				<Text style = {styles.welcome}>
					Find a Ryde
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

				{/*Button to use the findButton function with an image being used for the button*/}
				<TouchableOpacity onPress = {() => {this.findButton()}}>
					<Image
						style = {styles.myImage}
						source = {require("./images/findImage.jpg")}
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

  	myImage: {
  		justifyContent: 'center',
  		alignItems: 'center'
  	}
});

module.exports = RideSearch;
AppRegistry.registerComponent("RideSearch", () => RideSearch);