import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Keyboard,
	StatusBar
} from "react-native";

import { Actions } from "react-native-router-flux";

import {Item, Label, Input, Toast} from "native-base";

import styles from "./styles";

import config from "./../../config";

<<<<<<< HEAD
=======
let MessageBarAlert = require('react-native-message-bar').MessageBar;
let MessageBarManager = require('react-native-message-bar').MessageBarManager;
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
import OneSignal from 'react-native-onesignal';

class Login extends Component {
	constructor(props) {
		super(props);
		this.baseUrl = config();
		this.onIds = this.onIds.bind(this);
		this.state = {
<<<<<<< HEAD
			showToast: false,
=======
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
			deviceId: '',
			loading: false,
			textEmail: "Email",
			textPass: "Password"
		}
	}

	componentWillMount() {
	  OneSignal.addEventListener('ids', this.onIds);
		OneSignal.configure();
	}

	componentDidMount() {
		OneSignal.addEventListener('ids', this.onIds);
		OneSignal.configure();
	}

<<<<<<< HEAD

	componentWillUnmount() {
		OneSignal.removeEventListener('ids', this.onIds);
	}

	onIds(device) {
		this.setState({deviceId: device.userId});
=======
	componentWillUnmount() {
		// Remove the alert located on this master page from the manager
		OneSignal.removeEventListener('ids', this.onIds);
		MessageBarManager.unregisterMessageBar();
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
	}

	onIds(device) {
		this.setState({deviceId: device.userId});
	}

	submitButton() {
		this.setState({loading: true});
		let reqObj = {
			email: this.state.textEmail,
			password: this.state.textPass,
			deviceId: this.state.deviceId
		}
		fetch(this.baseUrl + "login", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {
			this.setState({loading: false});
			if (res.status === 200) {

				// we do self = this cus it will be called in the callback function in
				// the .then below i.e in this scope, resObjPromise.then(function(resObj) {} )
				// and the .then function doesn't have access to the 'this' of the class.
				// This means that when we do this.changeFunc, we only have access to
				// the 'this' of .then's function's scope which doesn't have any
				// changeFunc function so ofcourse the function is unddefined.
				// The way around this is to store this class's 'this' in a variable
				// and use that variable to access the changeFunc function in the
				// class scope

				// another work around is using ES6 arrow callback functions instead of
				// the traditional function i.e use .then( (resObj) => {} ) instead of
				// .then( function(resObj) {} )
				// Arrow functions work cus arrow functions automatically bind the function
				// to this (which the 'this' of the class) but normal functions don't.
				// Thus, with arrow functions, we will be able to access the class's
				// changeFunc function.
				// let self = this;

				// The response object returned contains the object being sent
				// from the server, we need to call the function res.json() which will
				// return the json object being sent by the server.
				resObjPromise = res.json(); // returns a promise and is asynchronous
				// promise value is extracted using the .then function and the object
				// returned by the promise is used
				resObjPromise.then(function(resObj) {
					// We then pass the resObj as a property for the choise page
					Keyboard.dismiss();
					// let obj = {changeUp: self.changeFunc} Remember changeFuncis defined outside this function i.e defned in class scope
					// console.log(obj.changeUp);
					// just pass obj as props i.e {resObj, obj}
					Actions.choice({resObj});
				})
			} else {
				Toast.show({
					text: 'Authentication Error\nWrong username or password',
					position: 'top',
					buttonText: 'Okay',
					duration: 3000
				});
			}

		}, (err) => {
			this.setState({loading: false});
			Toast.show({
				text: 'Connection Error\nNo internet connection',
				position: 'top',
				buttonText: 'Okay',
				type: 'danger',
				duration: 3000
			});
		});
	}

	registerButton() {
		Keyboard.dismiss();
		Actions.register({});
	}

	render() {
		return (
			<View style = {styles.container}>
<<<<<<< HEAD
			<Text style={styles.logo}> ryde </Text>
			<StatusBar
			backgroundColor="rgb(0, 51, 153)"
			barStyle="light-content"
			/>

			<Item floatingLabel style={{marginLeft: 40, marginRight: 40}}>
			<Label> Email </Label>
			<Input
			underlineColorAndroid = "transparent"
			onChangeText = {(text) => this.setState({textEmail: text})}
			/>
			</Item>
			<Item floatingLabel style={{marginTop: 10, marginLeft: 40, marginRight: 40}}>
			<Label>Password</Label>
			<Input
			secureTextEntry = {true}
			underlineColorAndroid = "transparent"
			onChangeText = {(text) => this.setState({textPass: text})}
			/>
			</Item>

			<TouchableOpacity onPress = {() => {this.submitButton()}} style = {{width: 280}}>
			<Text style = {styles.submitButtonOnLogin}> Login </Text>
			</TouchableOpacity>

			<View style = {styles.registerContainer}>
			<Text style={{fontFamily: 'sans-serif'}}>If not signed up then </Text><Text onPress = {this.registerButton} style = {{color: 'rgb(0, 51, 153)', fontFamily: 'sans-serif'}}>Register</Text>
			</View>
=======
				<StatusBar
		     backgroundColor="rgb(72, 110, 255)"
		     barStyle="light-content"
		   	/>
				<TextInput
					style = {styles.inputBox}
					placeholder = "Email"
         	underlineColorAndroid = "transparent"
					onChangeText = {(text) => this.setState({textEmail: text})}
				/>
				<TextInput
					style = {styles.inputBox}
					secureTextEntry = {true}
					placeholder = "Password"
					underlineColorAndroid = "transparent"
					onChangeText = {(text) => this.setState({textPass: text})}
				/>

				<TouchableOpacity onPress = {() => {this.submitButton()}} style = {{width: 300}}>
					<Text style = {styles.submitButtonOnLogin}> Login </Text>
				</TouchableOpacity>

				<View style = {styles.registerContainer}>
					<Text style={{fontFamily: 'sans-serif'}}>If not signed up then </Text><Text onPress = {this.registerButton} style = {{color: 'blue', fontFamily: 'sans-serif'}}>Register</Text>
				</View>

				<MessageBarAlert ref="alert" />

				{this.state.loading && <View style = {styles.loading}>
					<ActivityIndicator
						animating
						size="large"
					/>
				</View>}
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a

			{this.state.loading && <View style = {styles.loading}>
			<ActivityIndicator
			animating
			size="large"
			color="red"
			/>
			</View>}
			</View>
		);
	}
}

module.exports = Login;

AppRegistry.registerComponent("Login", () => Login);
