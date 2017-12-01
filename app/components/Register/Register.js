import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator
} from "react-native";

import {
	Form,
	Item,
	Label,
	Input,
	ListItem,
	Header,
	Left,
	Body,
	Title,
	Button,
	Icon,
	Right,
	Picker,
	Item as FormItem,
	Toast
} from "native-base";

import { Actions } from "react-native-router-flux";
import Choice from "../Choice/Choice";
import styles from "./styles";
import config from "./../../config";
import DateTimePicker from 'react-native-modal-datetime-picker';
import OneSignal from 'react-native-onesignal';

class Register extends Component {

	constructor(props) {
		super(props);
		this.baseUrl = config();
		this.onIds = this.onIds.bind(this);
		this.userMs = undefined;
		this.state = {
			deviceId: '',
			date: 'Date of Birth',
			isDateTimePickerVisible: false,
			firstName: "First name",
			lastName: "Last name",
			email: "Email",
			password: "password",
			dob: "Date of birth",
			phone: "Mobile phone number",
			gender: "Gender",

			firstNameS: {
				color: "grey"
			},

			lastNameS: {
				color: "grey"
			},

			emailS: {
				color: "grey"
			},

			passwordS: {
				color: "grey"
			},

			dobS: {
				color: "grey",
				fontSize: 16
			},

			phoneS: {
				color: "grey"
			},

			genderS: {
				color: "grey"
			}
		}
	}

<<<<<<< HEAD
			loading: false,
			showToast: false
		}
	}


	componentWillMount() {
	  OneSignal.addEventListener('ids', this.onIds);
		OneSignal.configure();
	}

=======

	componentWillMount() {
	  OneSignal.addEventListener('ids', this.onIds);
		OneSignal.configure();
	}

>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
	componentWillUnmount() {
	    OneSignal.removeEventListener('ids', this.onIds);
	}

	onIds(device) {
		this.setState({deviceId: device.userId});
	}

	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	_handleDatePicked = (date) => {

		this.userMs = date.getTime();

		let day = date.getDate();
		// the month that you get is from 0 to 11
		let month = date.getMonth() + 1;
		let year = date.getFullYear();

		let formattedDate = day + "/" + month + "/" + year;

		this.setState({date: formattedDate, dob: formattedDate, dobS: {color: "grey"}});
    	// console.log('Your Date of Birth is: ', date);
    	this._hideDateTimePicker();

		}

	emailCheck() {
		let emailCheck = false;
		let checkObj = {at: false, dot: false, email: false};

		for (let i = 0; i < this.state.email.length; ++i) {
			// all the expression need to be true in order for the entire expression
			// to be true
			if (this.state.email[i] === "@") {
				checkObj.at = true;
				// if a letter is @ then the letter cannot be anything else again
				// therefore we continue the loop by skipping the if statement below
				continue;
			}

			if (this.state.email[i] === ".") {
				checkObj.dot = true;
			}

		}

		let emailObj = {email: this.state.email};

		// The fetch function call will return a promise and takes in two parameter
		// first is the url with which it makes a request and second parameter
		// is an object specifying the method details and the object that will
		// get sent. The promise being returned, gives back two call back functions
		// first contains one parameter which is the response object and the second
		// function contains one parameter which is the err.

		// the promise returned by the fetch function will be the return of the
		// .then function, so we are returning a promise
		this.setState({loading:true});
		return fetch(this.baseUrl + "emailCheck", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(emailObj)
		}).then((res) => {
			this.setState({loading:false});


			// Since fetch is asynchronous that returns a promise, we want to do
			// all the checks after this async function returns the promise and so
			// we use the .then function and then do all the checks, because any check
			// outside the .then function will execute first before the async function
			// finishes
			if (res.status === 200) {
				checkObj.email = true;
				if (checkObj.at && checkObj.dot && checkObj.email) {
					// Initially emailCheck is false, not email check will result in
					// emailCheck being true
					emailCheck = !emailCheck;
				}
				return emailCheck;
			} else {
				return emailCheck;
			}
		}, (err) => {
			this.setState({loading:false});


			Toast.show({
				text: 'Promise Error:\nUnhandled promise',
				position: 'top',
				buttonText: 'Okay',
				duration: 3000
			});
			return emailCheck;
		});
	}

	phoneCheck() {
		let phoneCheck = true;

		for (let i = 0; i < this.state.phone.length; ++i) {
			// Either of these expression being true will result in the statement eing true,
			// only if both the statements are false then the first half of the expression will be false.
			// Both the expression in the outer expresion need to be true in order for the entire expression to be true,
			// one of the expression being false will result in the entire statement being false.
			if ((this.state.phone.charCodeAt(i) < 48 || this.state.phone.charCodeAt(i) > 57) && this.state.phone.charCodeAt(i) !== 43) {
				phoneCheck = false;
			}
		}

		return phoneCheck;
	}

	firstNameChecker() {
		// either of these expression need to be true in order for the entire expression to be true
		if (this.state.firstName.length === 0 || this.state.firstName === "First name") {
			return false;
		}
		return true;
	}

	lastNameChecker() {
		// either of these expression need to be true in order for the entire expression to be true
		if (this.state.lastName.length === 0 || this.state.lastName === "Last name") {
			return false;
		}
		return true;
	}

	dobCheck() {
		// if it is undefined we immedietly know that nothing was filled in
		if (this.userMs === undefined) {
			return false;
		}
		// create the date object which represents the current time
		let currentDate = new Date();
		// converting the date into millisecons, gives the time from 1 Jan 1970 to now
		let currentMs = currentDate.getTime()
		let msDiff = currentMs - this.userMs;
		// ms to seconds to minutes to hours to days to year
		age = ((((msDiff / 1000) / 60) / 60) / 24) / 365;
		// if the age is less than 18 then return false meaning to young to use the app
		if (age < 18) {
			return false;
		}
		return true;
	}

	genderCheck() {
		if (this.state.gender === "Gender") {
			return false;
		}
		return true;
	}

	// passwords must contains numbers
	passwordCheck() {
		// password below the length of 6 is false
		if (this.state.password.length < 6) {
			return false;
		}

		let containsNumbers = false
		let containsLetters = false
		for (let i = 0; i < this.state.password.length; ++i) {
			// function to check if a data type is NaN
			if (isNaN(Number(this.state.password[i]))) {
				containsNumbers = true;
			} else {
				containsLetters = true;
			}
		}

		// if only contains numbers and letters true is returned
		if (containsNumbers == true && containsLetters == true) {
			return true;
		}

		// by default I return false
		return false;

	}

	submitButton() {
		let emailCheck = this.emailCheck();
		let errors = [];

		emailCheck.then((val) => {
			if (val === false) {
				this.setState({emailS: {color: "red"}});
				errors.push(0);
			} else {
				this.setState({emailS: {color: "grey"}});
			}
			if (this.dobCheck() === false) {
				this.setState({dobS: {color: "red", fontSize: 16}})
				errors.push(0);
			} else {
				this.setState({dobS: {color: "grey", fontSize: 16}});
			}

			let phoneCheck = this.phoneCheck();

			if (phoneCheck === false) {
				this.setState({phoneS: {color: "red"}})
				errors.push(0);
			} else {
				this.setState({phoneS: {color: "grey"}});
			}

			if (this.firstNameChecker() === false) {
				this.setState({firstNameS: {color: "red"}});
				errors.push(0);
			} else {
				this.setState({firstNameS: {color: "grey"}})
			}

			if (this.lastNameChecker() === false) {
				this.setState({lastNameS: {color: "red"}});
				errors.push(0);
			} else {
				this.setState({lastNameS: {color: "grey"}});
			}

			if (this.genderCheck() === false) {
				this.setState({genderS: {color: "red"}});
				errors.push(0);
			} else {
				this.setState({genderS: {color: "grey"}});
			}

			if (this.passwordCheck() === false) {
				this.setState({passwordS: {color: "red"}});
				errors.push(0);
			} else {
				this.setState({passwordS: {color: "grey"}});
			}

			let reqObj = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				password: this.state.password,
				dob: this.state.dob,
				phone: this.state.phone,
				gender: this.state.gender,
				plate: '',
				liscense: '',
				car: '',
				allInfoFilled: false,
				seen: false,
				totalRating: 0,
				numRating: 0,
				deviceId: this.state.deviceId
			}

			// I want to send the object only if there are no errors
			if (errors.length === 0) {
				// The fetch function call will return a promise and takes in two parameter
				// first is the url with which it makes a request and second parameter
				// is an object specifying the method details and the object that will
				// get sent. The promise being returned, gives back two call back functions
				// first contains one parameter which is the response object and the second
				// function contains one parameter which is the err.
				this.setState({loading:true});
				fetch(this.baseUrl + "register", {
					method: "POST",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify(reqObj)
				}).then((res) => {
					this.setState({loading:false});


					if (res.status === 200) {
						this.setState({loading:true});
						// on completing the registration we create the personal rydes object which
						// every user will have
						// we send the email address using the query string
						fetch(this.baseUrl + this.state.email + "/createPersonalRyde", {
							method: "GET"
						// res means response object
						}).then((res) => {
							this.setState({loading:false});


							if (res.status === 200) {
<<<<<<< HEAD
								Toast.show({
									text: 'Registration Complete',
									position: 'top',
									buttonText: 'Okay',
									duration: 3000
								}); // should be changed to a message bar
=======
								alert("Registration complete"); // should be changed to a message bar
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
								// on completing the registration we switch to the login page
								Actions.login({type: 'reset'});
							} else {
								Toast.show({
									text: 'Server sent an error',
									position: 'top',
									buttonText: 'Okay',
									duration: 3000
								});
							}
						// err means the error returned from the promise
						}, (err) => {
							this.setState({loading:false});


							Toast.show({
								text: 'Promise Error:\nUnhandled promise',
								position: 'top',
								buttonText: 'Okay',
								duration: 3000
							});

						});
					} else {
						Toast.show({
									text: 'Server sent an error',
									position: 'top',
									buttonText: 'Okay',
									duration: 3000
								});
					}
				}, (err) => {
					this.setState({loading:false});


					Toast.show({
						text: 'Promise Error:\nUnhandled promise',
						position: 'top',
						buttonText: 'Okay',
						duration: 3000
					});
				});
			}

		})

	}


	render() {
		return (
			<ScrollView style={{backgroundColor: '#fff'}}>
<<<<<<< HEAD
=======
				<Header style={{backgroundColor:'rgb(72, 110, 255)'}}>
					<Body>
						<Title style={{alignSelf: 'center', fontFamily: 'sans-serif'}}>REGISTER</Title>
					</Body>
				</Header>
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a

				<View style={{ marginTop:30, paddingLeft:15}}>
					<Text style={{fontSize: 40, fontFamily: 'sans-serif', color: 'rgb(0, 51, 153)'}}>
						Register
					</Text>
				</View>

				<Form>
					<Item floatingLabel>
						<Label style = {this.state.firstNameS}>First name</Label>
						<Input
							onChangeText = {(text) => this.setState({firstName: text, firstNameS: {color: "grey"}})}
						/>
					</Item>
				</Form>

				<Form>
					<Item floatingLabel>
						<Label style = {this.state.lastNameS}>Last name</Label>
						<Input
							onChangeText = {(text) => this.setState({lastName: text, lastNameS: {color: "grey"}})}
						/>
					</Item>
				</Form>


				<Form>
					<Item floatingLabel>
						<Label style = {this.state.emailS}>Email</Label>
						<Input
							onChangeText = {(text) => this.setState({email: text, emailS: {color: "grey"}})}
						/>
					</Item>
				</Form>

				<Form>
					<Item floatingLabel>
						<Label style = {this.state.passwordS}>Password</Label>
						<Input
							secureTextEntry = {true}
							onChangeText = {(text) => this.setState({password: text, passwordS: {color: "grey"}})}

						/>
					</Item>
				</Form>

				<ListItem icon style={{marginTop:28}} onPress={this._showDateTimePicker}>
					<Body>
						<Text style={this.state.dobS}>{this.state.date}</Text>
					</Body>
				</ListItem>
				<DateTimePicker
         			isVisible={this.state.isDateTimePickerVisible}
          			onConfirm={this._handleDatePicked}
          			onCancel={this._hideDateTimePicker}
        		/>

				<Form>
					<Item floatingLabel>
						<Label style = {this.state.phoneS}>Phone number</Label>
						<Input
							onChangeText = {(text) => this.setState({phone: text, phoneS: {color: "grey"}})}
						/>
					</Item>
				</Form>


				<Form style={{paddingLeft:15, marginTop:28, marginBottom: 28}}>
					<Picker
						style = {this.state.genderS}
						mode="dropdown"
						placeholder="Gender"
						selectedValue={this.state.gender}
						onValueChange={(value) => this.setState({gender: value, genderS: {color: "grey"}})}
					>
						<Item label="Gender" value="gender" />
						<Item label="Male" value="male" />
						<Item label="Female" value="female" />
					</Picker>
				</Form>

				<View style = {{marginTop: 15, marginBottom: 30, paddingLeft: 15, paddingRight: 15}}>
					<TouchableOpacity onPress = {() => {this.submitButton()}}>
						<Text style = {{backgroundColor:'rgb(0, 51, 153)', textAlign:'center', height:60, color:'#fff', fontSize:18, paddingTop:14, marginTop:25, fontFamily: 'sans-serif'}}>
							Register
						</Text>
					</TouchableOpacity>
				</View>

				{this.state.loading && <View style = {styles.loading}>
				<ActivityIndicator
				animating
				size="large"
				color="red"
				/>
				</View>}

			</ScrollView>
		);
	}
}

module.exports = Register;

AppRegistry.registerComponent("Register", () => Register);
