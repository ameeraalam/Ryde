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
import { Container, Header, Left, Icon, Body, Button, Right, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem, Badge } from 'native-base';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";

// Main class
class RideSearch extends Component{

	constructor(props){
		super(props);
		this.baseUrl = config();
		this.openMenu = this.openMenu.bind(this);
		this.openNotifications = this.openNotifications.bind(this);
		this.setBadge = this.setBadge.bind(this);
		this.state = {
      placeBadge: false,
			fromLocation: "From:",
			toLocation: "To:",
			travelDate: "Date: (DD/MM)",
			numPassengers: "Amount of Passengers:",
			numLuggage: "Amount of Luggage:"
		}
	}


	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}


	openNotifications(){
		this.notifications.openDrawer();
	}

	openMenu() {
		this.drawer.openDrawer();
	}


	setBadge(num) {
    if(num > 0){
			if(this._isMounted){
       	this.setState({placeBadge: true});
			}
    } else {
			if(this._isMounted){
	      this.setState({placeBadge: false});
			}
		}
  }


	// Code for functionality of the Find button on the app page
	findButton(){

		let passedResObj = this.props.resObj;

		let reqObj = {
			from: this.state.fromLocation,
			to: this.state.toLocation,
			date: this.state.travelDate,
			passengers: this.state.numPassengers,
			luggage: this.state.numLuggage
		}

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
					let {isPassenger, driverFilledObj} = this.props;
					Actions.rideBrowser({passedResObj, isPassenger, resObj, driverFilledObj})
				})
			} else {

				alert("Error encountered!"); // change to message bar
			}
		}, (err) => {
			alert(err); // change to message bar
		});
	}

	// App visuals
	render(){
		let displayBadge = (<Badge style={{ position: 'absolute', right: 14, top: 9, paddingTop: 0,
      paddingBottom: 0, borderRadius: 100, height: 11, zIndex: 1 }}/>)

		return(

			<Notifications
				badgeFunc = {this.setBadge}
				isPassenger={true}
				resObj = {this.props.resObj}
				driverFilledObj = {this.props.driverFilledObj}
				ref={(notifications) => (this.notifications = notifications)}>
				<Drawer
					isPassenger={true}
          resObj = {this.props.resObj}
          driverFilledObj = {this.props.driverFilledObj}
					ref={(drawer) => this.drawer = drawer}>
					<Container>
						<Header style={{backgroundColor: 'rgb(72, 110, 255)'}}>
							<Left style={{flex: 1}}>
								<Button transparent onPress={this.openMenu}>
									<Icon name='menu' />
								</Button>
							</Left>
							<Body style={{alignItems: 'center', flex: 1}}>
								<Title style={{fontFamily: 'sans-serif'}}>RYDE SEARCH</Title>
							</Body>
							<Right style={{flex: 1}}>
								<Button badge onPress = {() => {this.openNotifications()}} transparent>
									{this.state.placeBadge && displayBadge}
									<Icon name='notifications' />
								</Button>
							</Right>
						</Header>
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
								<Text>
									Query
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

	myImage: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});

module.exports = RideSearch;
AppRegistry.registerComponent("RideSearch", () => RideSearch);
