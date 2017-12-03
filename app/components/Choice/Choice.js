import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity,
	StatusBar
} from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Center, Footer,
	FooterTab, Body, Content, Card, CardItem, Grid, Row, Col } from "native-base";
	import { Actions } from "react-native-router-flux";
	import styles from "./styles";


	class Choice extends Component {

		constructor(props) {
			super(props);
			this.submitDriver = this.submitDriver.bind(this);
			this.submitPassenger = this.submitPassenger.bind(this);
			this.setDriverInfoFilled = this.setDriverInfoFilled.bind(this);
			this.state = {
				allDriverInfoFilled: false
			}
		}


		submitDriver() {
			let {allDriverInfoFilled} = this.state;
			let isDriverInfoFilled = true;
			// Takes you to driver's home page, if all infos are filled.
			// Otherwise a page will pop up asking for incomplete driver fields to be completed
			if (!this.props.resObj.allInfoFilled && !allDriverInfoFilled) {
				let resObj = this.props.resObj
				let driverFilledObj = {driverInfo: this.setDriverInfoFilled}
				// the resObj that gets passed on to Choice component will be passed to the DriverInfo component
				Actions.driverInfo({resObj, driverFilledObj});
			} else {
				let resObj = this.props.resObj
				// the resObj that gets passed on to Choice component will be passed to the DriverInfo component
				// take to the driver's home page
				let isPassenger = false;
				let driverFilledObj = {driverInfo: this.setDriverInfoFilled, isDriverInfoFilled: isDriverInfoFilled}
				Actions.driverView({isPassenger, resObj, driverFilledObj});
			}
		}

		submitPassenger() {
			let {allDriverInfoFilled} = this.state;
			// takes you to passenger's home page
			let resObj = this.props.resObj
			let isDriverInfoFilled = true;
			if (!this.props.resObj.allInfoFilled && !allDriverInfoFilled) {
						isDriverInfoFilled = false;
			}

			let driverFilledObj = {
				driverInfo: this.setDriverInfoFilled,
				isDriverInfoFilled: isDriverInfoFilled
			}

			Actions.passengerView({resObj, driverFilledObj});
		}


		setDriverInfoFilled() {
			this.setState({allDriverInfoFilled: true});
		}

		render() {
			return (

					<Container>
							<StatusBar
								backgroundColor="rgb(0, 51, 153)"
								barStyle="light-content"
								/>

								<Content style={{backgroundColor:'#fff'}}>
									<View style={{ marginTop: '70%', flex:1, justifyContent: 'space-around', flexDirection: 'row'}}>
											<TouchableOpacity><Icon name='car' style={{color:'rgb(0, 51, 153)', fontSize: 80}} onPress = {() => {this.submitDriver()}}/></TouchableOpacity>
											<TouchableOpacity><Icon name='people' style={{color: 'rgb(0, 51, 153)', fontSize: 80}} onPress = {() => {this.submitPassenger()}}/></TouchableOpacity>
									</View>
								</Content>
							</Container>
			)
		}

	}

	module.exports = Choice;

	AppRegistry.registerComponent("Choice", () => Choice);
