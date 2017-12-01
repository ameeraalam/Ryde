import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity,
	ActivityIndicator
} from "react-native";

import {
	Form,
	Item,
	Label,
	Input,
	ListItem,
	Container,
	Header,
	Left,
	Icon,
	Body,
	Button,
	Right,
	Title,
	Content,
	Toast
} from "native-base";

import { Actions } from "react-native-router-flux";

import styles from "./styles";
import Drawer from '../Drawer/Drawer';
import config from "./../../config"


class DriverInfo extends Component {

	constructor(props) {
		super(props);
		this.baseUrl = config();
		this.openMenu = this.openMenu.bind(this);
		this.state = {
			showToast: false,
			loading: false,
			plate: "Car plate number",
			liscense: "Driver's licsense number",
			car: "Car model number",
			plateS: {color: "grey"},
			liscenseS: {color: "grey"},
			carS: {color: "grey"}
		}
	}

	componentDidMount(){
		Toast.show({
				text: 'The information below are mandatory in order to access functionalities of a driver',
				position: 'bottom',
				buttonText: 'Okay',
				duration: 30000
			});
	}

	openMenu() {
		this.drawer.openDrawer();
	}


	// plate number can only contain numbers and letters
	plateCheck() {

		plateCheck = false;

		for (let i = 0; i < this.state.plate.length; ++i) {
			// either one of these expressions in bracket joined by or will
			// result in the entire expression to result to true
			// both the expression in the smaller expersion needs to be true
			// for the entire statement to be true
			if ((this.state.plate.charCodeAt(i) > 64 && this.state.plate.charCodeAt(i) < 91) || (this.state.plate.charCodeAt(i) > 96 && this.state.plate.charCodeAt(i) < 123) || (this.state.plate.charCodeAt(i) > 47 && this.state.plate.charCodeAt(i) < 58) || this.state.plate.charCodeAt(i) === 32) {
				plateCheck = true;
			} else {
				// if we find even one letter not being accurate we stop checking and just return false
				return false;
			}
		}

		return plateCheck;

	}


	// removes uncessary spaces from the plate number and transforms
	// small letter to capital letter

	// 96 to 123
	formatPlate() {
		formattedPlate = "";
		for (let i = 0; i < this.state.plate.length; ++i) {
			// if the letter is a space we simply skip over the letter
			if (this.state.plate.charCodeAt(i) === 32) {
				continue;
			}

			// if the letters are within 96 and 123 both then we transform them
			if (this.state.plate.charCodeAt(i) > 96 && this.state.plate.charCodeAt(i) < 123) {
				formattedPlate += String.fromCharCode(this.state.plate.charCodeAt(i) - 32)
			} else {
				formattedPlate += this.state.plate[i];
			}
		}

		return formattedPlate;
	}



	liscenseCheck() {
		check = false;

		for (let i = 0; i < this.state.liscense.length; ++i) {
			// either one of these expressions in bracket joined by or will
			// result in the entire expression to result to true
			// both the expression in the smaller expersion needs to be true
			// for the entire statement to be true
			if ((this.state.liscense.charCodeAt(i) > 64 && this.state.liscense.charCodeAt(i) < 91) ||
					(this.state.liscense.charCodeAt(i) > 96 && this.state.liscense.charCodeAt(i) < 123) ||
					(this.state.liscense.charCodeAt(i) > 47 && this.state.liscense.charCodeAt(i) < 58) ||
					(this.state.liscense.charCodeAt(i) === 32) || (this.state.liscense.charCodeAt(i) === 45)) {
				check = true;
			} else {
				return false;
			}

		}
		return check;
	}

	submitButton() {

		let formattedPlate = this.formatPlate();

		let plateCheck = this.plateCheck();

		let liscenseCheck = this.liscenseCheck();


		// if plateCheck returns false it means that an invalid string was
		// inputed into the plate text field
		if (!plateCheck) {
			this.setState({plateS: {color: "red"}});
			// exit the function if the plate information is wrong
			return;
		}

		// if liscenseCheck returns false it means that an invalid string
		// was inputed into the liscense text field
		if (!liscenseCheck) {
			this.setState({liscenseS: {color: "red"}});
			// exit the function if the plate information is wrong
			return;
		}

		// create the object to be sent
		let reqObj = {
			email: this.props.resObj.email,
			plate: formattedPlate,
			liscense: this.state.liscense,
			car: this.state.car
		}

		let resObj = this.props.resObj
		this.setState({loading: true});
		fetch(this.baseUrl + "driverInfo", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {
			this.setState({loading: false});

			if (res.status === 200) {
				this.props.driverFilledObj.driverInfo()
				Actions.driverView({type: 'replace', resObj});

			} else {
				Toast.show({
									text: 'Server sent an error',
									position: 'top',
									buttonText: 'Okay',
									duration: 3000
								});
			}
		}, (err) => {
			if (err) {
				Toast.show({
				text: 'Promise Error:\nUnhandled promise',
				position: 'top',
				buttonText: 'Okay',
				duration: 3000
			});
			}
		});

	}

	render() {
		return (
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
							<Title style={{fontFamily: 'sans-serif'}}>Details</Title>
						</Body>
						<Right style={{flex: 1}} />
					</Header>

					<Content style={{backgroundColor: 'white'}}>
						<Form>
							<Item floatingLabel>
								<Label style = {this.state.plateS}>Plate number</Label>
								<Input
									onChangeText = {(text) => this.setState({plate: text, plateS: {color: "grey"}})}
									/>
							</Item>
						</Form>


						<Form>
							<Item floatingLabel>
								<Label style = {this.state.liscenseS}>Liscense number</Label>
								<Input
									onChangeText = {(text) => this.setState({liscense: text, liscenseS: {color: "grey"}})}
									/>
							</Item>
						</Form>

						<Form>
							<Item floatingLabel>
								<Label style = {this.state.carS}>Car model</Label>
								<Input
									onChangeText = {(text) => this.setState({car: text, carS: {color: "grey"}})}
									/>
							</Item>
						</Form>

						<View style = {{marginTop: 15, marginBottom: 30, paddingLeft: 15, paddingRight: 15}}>
							<TouchableOpacity onPress = {() => {this.submitButton()}}>
								<Text style = {{backgroundColor:'rgb(0, 51, 153)', textAlign:'center', height:60, color:'#fff', fontSize:18, paddingTop:14, marginTop:25, fontFamily: 'sans-serif'}}>
									Submit
								</Text>
							</TouchableOpacity>
						</View>
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

		);
	}
}

module.exports = DriverInfo;
