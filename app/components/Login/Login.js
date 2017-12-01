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
import { Toast } from 'native-base';

import styles from "./styles";

import config from "./../../config";

import OneSignal from 'react-native-onesignal';
// var _ = require('lodash');

class Login extends Component {
 	constructor(props) {
		super(props);
		this.baseUrl = config();
		this.onIds = this.onIds.bind(this);
		this._Mounted = false;
		this.state = {
			loginName: 'Login',
			showToast: false,
			deviceId: '',
			loading: false,
			textEmail: "Email",
			textPass: "Password"
		}
	}

	componentDidMount() {
		this._Mounted = true;
		OneSignal.addEventListener('ids', this.onIds);
		OneSignal.configure();
	}

	componentWillUnmount() {
		this._Mounted = false;
		OneSignal.removeEventListener('ids', this.onIds);
	}

	onIds(device) {
		if(this._Mounted){
			this.setState({deviceId: device.userId});
		}
	}

	componentWillReceiveProps(nextProps) {
		// console.log('nextProps: ' + JSON.stringify(nextProps));
		// this.setState({loginName: nextProps.newPees.good})
	}


	submitButton() {
		// Actions.refresh({data: 'hello'})
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
					text: 'Authentication Error\nWrong username or password!',
					position: 'top',
					buttonText: 'Okay',
					type: 'warning',
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

				{this.state.loading && <View style = {styles.loading}>
					<ActivityIndicator
						animating
						size="large"
					/>
				</View>}

			</View>
		);
	}
}

module.exports = Login;

AppRegistry.registerComponent("Login", () => Login);
