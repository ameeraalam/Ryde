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
<<<<<<< HEAD
import { Container, Header, Left, Icon, Body, Button, Right, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem, Item, Input, Toast, Picker } from 'native-base';
=======
import { Container, Header, Left, Icon, Body, Button, Right, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";
import DateTimePicker from 'react-native-modal-datetime-picker';

// Main class
class RideSearch extends Component{

	constructor(props){
		super(props);
		this.baseUrl = config();
		this.openMenu = this.openMenu.bind(this);
		this.openNotifications = this.openNotifications.bind(this);
		this.state = {
			fromLocation: "From",
			toLocation: "To",
			travelDate: "Date",
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

<<<<<<< HEAD
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
=======
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a

	// Code for functionality of the Find button on the app page
	findButton(){
		this.setState({loading: true});

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
			this.setState({loading: false});

			if (res.status === 200){

				let resObjPromise = res.json();

				resObjPromise.then((resObj) => {

					Actions.rideBrowser({passedResObj, resObj})
				})
			} else {

<<<<<<< HEAD
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
=======
				alert("Error encountered!"); // change to message bar
			}
		}, (err) => {
			alert(err); // change to message bar
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
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
<<<<<<< HEAD
						<Header style={{backgroundColor: 'rgb(0, 51, 153)'}}>
=======
						<Header style={{backgroundColor: 'rgb(72, 110, 255)'}}>
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
							<Left style={{flex: 1}}>
								<Button transparent onPress={this.openMenu}>
									<Icon name='menu' />
								</Button>
							</Left>
							<Body style={{alignItems: 'center', flex: 1}}>
<<<<<<< HEAD
								<Title style={{fontFamily: 'sans-serif'}}>Search</Title>
=======
								<Title style={{fontFamily: 'sans-serif'}}>RYDE SEARCH</Title>
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
							</Body>
							<Right style={{flex: 1}}>
								<Button onPress = {() => {this.openNotifications()}} transparent>
									<Icon name='notifications' />
								</Button>
							</Right>
						</Header>
<<<<<<< HEAD
						<Content contentContainerStyle = {styles.mainStyle}>


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
								
								{/*Input box for the date*/}

								<Item style = {styles.inputBox} onPress={this._showDateTimePicker}>
									<Icon active name ='calendar'/>
									<Text style={{fontSize: 18}}> {this.state.travelDate}</Text>
								</Item>

								<DateTimePicker
									isVisible={this.state.isDateTimePickerVisible}
									onConfirm={this._handleDatePicked}
									onCancel={this._hideDateTimePicker}
							 />

							{/*Button to use the findButton function with an image being used for the button*/}
							<TouchableOpacity onPress = {() => {this.findButton()}} style = {{width: 280}}>
								<Text style= {styles.submitButtonOnFind}>
									Find
								</Text>
							</TouchableOpacity>

							{this.state.loading && <View style = {styles.loading}>
							<ActivityIndicator
							animating
							size="large"
							color="red"
							/>
							</View>}

						</Content>
=======
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
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
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
<<<<<<< HEAD
		width: 250,
		marginTop: 5
=======
		width: 200,
		borderColor: '#000000',
		borderWidth: 1
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
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
<<<<<<< HEAD
	},

	submitButtonOnFind: {
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
=======
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
	}
});

module.exports = RideSearch;
AppRegistry.registerComponent("RideSearch", () => RideSearch);
