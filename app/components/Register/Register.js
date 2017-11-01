

import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity
} from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Center, Footer, FooterTab,
          Body, Content, Card, CardItem, Grid, Row, Col, List, ListItem, Switch, Picker, Form, Item as FormItem } from "native-base";
const Item = Picker.Item;
import { Actions } from "react-native-router-flux";
import Choice from "../Choice/Choice";
import styles from "./styles";
import Config from '../Config/Config';


class Register extends Component {

	constructor(props) {
		super(props);
		this.address = Config.ip;
		this.baseUrl = "http://" + this.address + ":3000/"; // https://ryde-matb.herokuapp.com/
		this.state = {
			firstName: "First name",
			lastName: "Last name",
			email: "Email",
			password: "password",
			dob: "Date of birth",
			phone: "Mobile phone number",
			gender: "Gender",
			plate: "Car plate number",
			liscense: "Driver's liscense number",
			car: "Car model number",
			firstNameS: {
				borderColor: 'red',
				color: "black"
			},

			lastNameS: {
				color: "black"
			},

			emailS: {
				color: "black"
			},

			passwordS: {
				color: "black"
			},

			dobS: {
				color: "black"
			},

			phoneS: {
				color: "black"
			},

			genderS: {
				color: "black"
			},

			plateS: {
				color: "black"
			},

			liscenseS: {
				color: "black"
			},

			carS: {
				color: "black"
			}
		}
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
		return fetch(this.baseUrl + "emailCheck", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(emailObj)
		}).then((res) => {
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
				alert("A user with the email is already registered");
				return emailCheck;
			}
		}, (err) => {
			alert(err)
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

	driverFieldsCheck() {
		let plateCounter = 0;
		let liscenseCounter = 0;
		let carCounter = 0;

		for (let i = 0; i < this.state.plate.length; ++i) {
			// The expression has an and because the letter has to be WITHIN 64 and 123 and only way
			// it can be within is if it is both greater than 64 and less than 123, also if the char code is a space
			// the whole expression will be true. Either one of these expression needs to be true in order for the entire
			// expression to evaluate to true. And both the inner expression needs to be true in order for the inner expression
			// to evaluate to true
			if ((this.state.plate.charCodeAt(i) > 64 && this.state.plate.charCodeAt(i) < 123) || this.state.plate.charCodeAt(i) === 32) {
				++plateCounter;
			}
		}

		for (let i = 0; i < this.state.liscense.length; ++i) {
			if ((this.state.liscense.charCodeAt(i) > 64 && this.state.liscense.charCodeAt(i) < 123) || this.state.liscense.charCodeAt(i) === 32) {
				++liscenseCounter;
			}
		}

		for (let i = 0; i < this.state.car.length; ++i) {
			if ((this.state.car.charCodeAt(i) > 64 && this.state.car.charCodeAt(i) < 123) || this.state.car.charCodeAt(i) === 32) {
				++carCounter;
			}
		}

		if (plateCounter === this.state.plate.length || liscenseCounter === this.state.liscense.length || carCounter === this.state.car.length) {
			return false;
		}

		return true;
	}

	firstNameChecker() {
		if (this.state.firstName.length === 0) {
			return false;
		}
		return true;
	}

	lastNameChecker() {
		if (this.state.lastName.length === 0) {
			return false;
		}
		return true;
	}

	submitButton() {
		let errors = [];

		let emailCheck = this.emailCheck();

		emailCheck.then((val) => {

			if (val === false) {
				this.setState({emailS: {color: "red"}});
				errors.push("email");
			} else {
				this.setState({emailS: {color: "black"}});
			}

			let phoneCheck = this.phoneCheck();

			if (phoneCheck === false) {
				this.setState({phoneS: {color: "red"}})
				errors.push("phone");
			} else {
				this.setState({phoneS: {color: "black"}});
			}

			if (this.firstNameChecker() === false) {
				this.setState({firstNameS: {color: "red"}});
				errors.push("firstName");
			} else {
				this.setState({firstNameS: {color: "black"}})
			}

			if (this.lastNameChecker() == false) {
				this.setState({lastNameS: {color: "red"}});
				errors.push("lastName");
			} else {
				this.setState({lastNameS: {color: "black"}});
			}

			let reqObj = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				password: this.state.password,
				dob: this.state.dob,
				phone: this.state.phone,
				gender: this.state.gender,
				plate: this.state.plate,
				liscense: this.state.liscence,
				car: this.state.car,
				allInfoFilled: this.driverFieldsCheck()
			}

			// I want to send the object only if there are no errors
			if (errors.length === 0) {
				// The fetch function call will return a promise and takes in two parameter
				// first is the url with which it makes a request and second parameter
				// is an object specifying the method details and the object that will
				// get sent. The promise being returned, gives back two call back functions
				// first contains one parameter which is the response object and the second
				// function contains one parameter which is the err.
				fetch(this.baseUrl + "register", {
					method: "POST",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify(reqObj)
				}).then((res) => {
					if (res.status === 200) {
						// change alert later
						alert("Registration complete");
						Actions.login({type: 'reset'}); //should use reset, i.e pop all scenes and use this as the intial scene. This is done to prevent a back button when we enter login page
					} else {
						alert("Error");
					}
				}, (err) => {
					alert("Server error");
				});
			}

		})

	}


	previousPage() {
    Actions.pop({});
  }


	render() {
		return (
			<Container>
        <Header style={{backgroundColor:'rgb(72, 110, 255)'}}>
          <Left style={{flex: 1}}>
            <Button transparent onPress={this.previousPage}>
              <Icon name='arrow-back' />
            </Button>
          </Left>

          <Body style={{flex: 1}}>
            <Title style={{alignSelf: 'center', fontFamily: 'sans-serif'}}>Register</Title>
          </Body>

          <Right style={{flex: 1}}/>
        </Header>

        <Content style={{backgroundColor:'#fff'}}>
					<View style={{ marginTop:30, paddingLeft:15, marginBottom:20}}>
						<Text style={{fontSize: 40, fontFamily: 'sans-serif', color: 'rgb(72, 110, 255)'}}>
							Register
						</Text>
					</View>

					<View style={{flex: 2, backgroundColor: '#fff', marginTop:10}}>
							<List>
								<ListItem icon>
									<Body>
										<TextInput
											placeholder = "First Name"
		        					underlineColorAndroid = "transparent"
											onChangeText = {(text) => this.setState({firstName: text, firstNameS: {color: "black"}})} />
									</Body>
									<Right />
								</ListItem>

								<ListItem icon style={{marginTop:10}}>
									<Body>
									<TextInput
										placeholder = "Last Name"
										underlineColorAndroid = "transparent"
										onChangeText = {(text) => this.setState({lastName: text, lastNameS: {color: "black"}})} />
									</Body>
									<Right />
								</ListItem>

								<ListItem icon style={{marginTop:10}}>
									<Body>
										<TextInput
											placeholder = "Email"
											underlineColorAndroid = "transparent"
											onChangeText = {(text) => this.setState({email: text, emailS: {color: "black"}})} />
									</Body>
									<Right />
								</ListItem>

								<ListItem icon style={{marginTop:10}}>
									<Body>
										<TextInput
											placeholder = "Password"
		        					underlineColorAndroid = "transparent"
											secureTextEntry = {true}
											onChangeText = {(text) => this.setState({password: text, passwordS: {color: "black"}})} />
									</Body>
									<Right />
								</ListItem>

								<ListItem icon style={{marginTop:10}}>
									<Body>
									<TextInput
										placeholder = "Date of Birth"
										underlineColorAndroid = "transparent"
										onChangeText = {(text) => this.setState({dob: text, dobS: {color: "black"}})} />
									</Body>
									<Right />
								</ListItem>

								<ListItem icon style={{marginTop:10}}>
									<Body>
										<TextInput
											placeholder = "Phone Number"
											underlineColorAndroid = "transparent"
											onChangeText = {(text) => this.setState({phone: text})} />
									</Body>
									<Right />
								</ListItem>

								<Form style={{paddingLeft:15}}>
									<Picker
										mode="dropdown"
										placeholder="Gender"
										selectedValue={this.state.gender}
										onValueChange={(value) => this.setState({gender: value, genderS: {color: "black"}})}  //{this.onValueChange2.bind(this)}
									>
										<Item label="Gender" value="gender" />
										<Item label="Male" value="male" />
										<Item label="Female" value="female" />
									</Picker>
								</Form>

								<ListItem itemDivider>
              		<Text>Optional</Text>
            		</ListItem>

								<ListItem icon style={{marginTop:10}}>
									<Body>
									<TextInput
										placeholder = "Plate Number"
										underlineColorAndroid = "transparent"
										onChangeText = {(text) => this.setState({plate: text, plateS: {color: "black"}})} />
									</Body>
									<Right />
								</ListItem>

								<ListItem icon style={{marginTop:10}}>
									<Body>
										<TextInput
											placeholder = "Drivers License"
											underlineColorAndroid = "transparent"
											onChangeText = {(text) => this.setState({liscense: text, liscenseS: {color: "black"}})} />
									</Body>
									<Right />
								</ListItem>

								<ListItem icon style={{marginTop:10}}>
									<Body>
										<TextInput
											placeholder = "Car Model"
											underlineColorAndroid = "transparent"
											onChangeText = {(text) => this.setState({car: text, car: {color: "black"}})} />
									</Body>
									<Right />
								</ListItem>
							</List>

							<View style = {{paddingLeft: 15, paddingBottom: 30, paddingRight: 15}}>
								<TouchableOpacity onPress = {() => {this.submitButton()}}>
									<Text style = {{backgroundColor:'rgb(72, 110, 255)', textAlign:'center', height:54, color:'#fff', fontSize:18, paddingTop:14, marginTop:25, fontFamily: 'sans-serif'}}>
										Register
									</Text>
								</TouchableOpacity>
							</View>
					</View>
				</Content>
			</Container>
		);
	}
}

module.exports = Register;

AppRegistry.registerComponent("Register", () => Register);

