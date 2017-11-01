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

class RideBrowser extends Component{

	render(){

		return(

			<View style = {styles.mainStyle}>
				<Text style = {styles.welcome}>
					Ryde Browser
				</Text>
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

module.exports = RideBrowser;
AppRegistry.registerComponent("RideBrowser", () => RideBrowser);