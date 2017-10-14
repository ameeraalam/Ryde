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

class RideSearch extends Component{

	constructor(props){
		super(props);
		this.address = "192.168.0.1";
		this.baseUrl = "http://" + this.address + ":3000/";
		this.state = {
			fromLocation: "From:",
			toLocation: "To:",
			travelDate: "Date: (DD/MM)",
			numPassengers: "Amount of Passengers:",
			numLuggage: "Amount of Luggage:"
		}
	}

	findButton(){

		let reqObj = {
			from: this.state.fromLocation,
			to: this.state.toLocation,
			date: this.state.travelDate,
			passengers: this.state.numPassengers,
			luggage: this.state.numLuggage
		}

		fetch(this.baseUrl + "", {
			method: "GET",
			headers: {
				"Accept:": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify
		});

		Actions.rydeBrowser({});
	}

	render(){

		return(

			<View style = {styles.mainStyle}>
				
				<Text style = {styles.welcome}>
					Find a Ryde
				</Text>

				<TextInput 
					style = {styles.inputBox}
					placeholder = {this.state.fromLocation}
					onChangeText = {(text) => this.setState({fromLocation: text})}
				/>

				<TextInput
					style = {styles.inputBox}
					placeholder = {this.state.toLocation}
					onChangeText = {(text) => this.setState({toLocation: text})}
				/>

				<TextInput
					style = {styles.inputBox}
					placeholder = {this.state.travelDate}
					onChangeText = {(text) => this.setState({travelDate: text})}
				/>

				<TextInput
					style = {styles.inputBox}
					placeholder = {this.state.numPassengers}
					onChangeText = {(text) => this.setState({numPassengers: text})}
				/>

				<TextInput
					style = {styles.inputBox}
					placeholder = {this.state.numLuggage}
					onChangeText = {(text) => this.setState({numLuggage: text})}
				/>

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