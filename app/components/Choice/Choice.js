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
<<<<<<< HEAD
=======
	import Drawer from '../Drawer/Drawer';
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a

	class Choice extends Component {

<<<<<<< HEAD
		constructor(props) {
			super(props);
=======
	class Choice extends Component {

		constructor(props) {
			super(props);
			this.openMenu = this.openMenu.bind(this);
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
			this.submitDriver = this.submitDriver.bind(this);
			this.submitPassenger = this.submitPassenger.bind(this);
			this.setDriverInfoFilled = this.setDriverInfoFilled.bind(this);
			this.state = {
<<<<<<< HEAD
=======
				isPassenger: undefined,
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
				allDriverInfoFilled: false
			}
		}

<<<<<<< HEAD
		submitDriver() {
			let {allDriverInfoFilled} = this.state;
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
				Actions.driverView({resObj});
			}
		}

=======
		openMenu() {
			this.drawer.openDrawer();
		}

		submitDriver() {
			let {allDriverInfoFilled} = this.state;
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
				Actions.driverView({resObj});
			}
		}

>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
		submitPassenger() {
			// takes you to passenger's home page
			let resObj = this.props.resObj
			// the resObj that gets passed on to Choice component will be passed to the DriverInfo component
			Actions.passengerView({resObj});
		}

		setDriverInfoFilled() {
			this.setState({allDriverInfoFilled: true});
		}

		render() {
			return (
<<<<<<< HEAD
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

=======
				<Drawer
					isPassenger = {this.state.isPassenger}
					role = {'role'}
					resObj = {this.props.resObj}
					ref={(_drawer) => this.drawer = _drawer}>

					<Container>
						<Header style={{backgroundColor:'rgb(72, 110, 255)'}}>
							<StatusBar
								backgroundColor="rgb(72, 110, 255)"
								barStyle="light-content"
								/>
							<Left style={{flex: 1}}>
								<Button transparent onPress={this.openMenu}>
									<Icon name='menu' />
								</Button>
							</Left>

							<Body style={{flex: 1}}>
								<Title style={{alignSelf: 'center', fontFamily: 'sans-serif'}}>CHOICE</Title>
							</Body>

							<Right style={{flex: 1}}/>
						</Header>

						<Content style={{backgroundColor:'#fff'}}>
							<View style={{marginTop:200, paddingLeft:15, paddingRight: 15}}>
								<TouchableOpacity onPress = {() => {this.submitDriver()}}>
									<Text style = {{backgroundColor:'rgb(72, 110, 255)', textAlign:'center', height:60, color:'#fff', fontSize:18, paddingTop:14, fontFamily: 'sans-serif'}}>
										Driver
									</Text>
								</TouchableOpacity>
							</View>

							<View style={{marginTop:25, paddingLeft:15, paddingRight: 15}}>
								<TouchableOpacity onPress = {() => {this.submitPassenger()}}>
									<Text style = {{backgroundColor:'rgb(72, 110, 255)', textAlign:'center', height:60, color:'#fff', fontSize:18, paddingTop:14, fontFamily: 'sans-serif'}}>
										Passenger
									</Text>
								</TouchableOpacity>
							</View>
						</Content>
					</Container>
				</Drawer>
			)
		}

	}

>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
	module.exports = Choice;

	AppRegistry.registerComponent("Choice", () => Choice);
