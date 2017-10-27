import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	Button,
	TouchableOpacity
} from "react-native";

import {
	Form,
	Item,
	Label,
	Input,
	ListItem,
} from "native-base";

import { Actions } from "react-native-router-flux";

import styles from "./styles";
class DriverInfo extends Component {

	constructor(props) {
		super(props);
		this.address = "192.168.2.76";
		this.baseUrl = "http://" + this.address + ":3000/";
		this.state = {
			plate: "Car plate number",
			liscense: "Driver's licsense number",
			car: "Car model number",
			plateS: {color: "grey"},
			liscenseS: {color: "grey"},
			carS: {color: "grey"}
		}
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
			if ((this.state.liscense.charCodeAt(i) > 64 && this.state.liscense.charCodeAt(i) < 91) || (this.state.liscense.charCodeAt(i) > 96 && this.state.liscense.charCodeAt(i) < 123) || (this.state.liscense.charCodeAt(i) > 47 && this.state.liscense.charCodeAt(i) < 58) || (this.state.liscense.charCodeAt(i) === 32) || (this.state.liscense.charCodeAt(i) === 45)) {
				check = true;
			} else {
				return false;
			}

		}
		return check;
	}

	submitButton() {

		let plateCheck = this.plateCheck();

		let formattedPlate = this.formatPlate();

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

		fetch(this.baseUrl + "driverInfo", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {
			if (res.status === 200) {

				// if the info gets succesfully updated then we move to the driver's homepage
				alert("Link me to Driver's homepage")

			} else {
				alert("Error");
			}
		}, (err) => {
			if (err) {
				alert(err);
			}
		});

	}

	render() {
		return (
			<View>
				<ListItem itemHeader>
					<Text>The infromation below are mandatory in order to access functionalities of a driver</Text>
				</ListItem>

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

				<TouchableOpacity onPress = {() => {this.submitButton()}}>
					<Image
						style = {styles.submitButton}
						source = {require("./images/button.png")}
					/>
				</TouchableOpacity>


			</View>
		);
	}
}

module.exports = DriverInfo;
