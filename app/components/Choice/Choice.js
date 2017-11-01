import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity
} from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Center, Footer,
  FooterTab, Body, Content, Card, CardItem, Grid, Row, Col } from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import Drawer from '../Drawer/Drawer';


class Choice extends Component {

	constructor(props) {
		super(props);
		this.openMenu = this.openMenu.bind(this);
		this.submitDriver = this.submitDriver.bind(this);
		this.submitPassenger = this.submitPassenger.bind(this);
		this.state = {
			isPassenger: undefined
		}
	}

	openMenu() {
    this.drawer.openDrawer();
  }

	submitDriver() {
		// Takes you to driver's home page, if all infos are filled.
		// Otherwise a page will pop up asking for incomplete driver fields to be completed
		if (!this.props.resObj.allInfoFilled) {
			let resObj = this.props.resObj
			// the resObj that gets passed on to Choice component will be
			// passed to the DriverInfo component
			Actions.driverInfo({resObj});
		} else {
			// take to the driver's home page
			// alert("Link me to driver's homepage");
			this.setState({isPassenger: false});
			Actions.driverview({});
		}
	}

	submitPassenger() {
		// takes you to passenger's home page
		// alert("Link me to passenger's homepage");
		this.setState({isPassenger: true});
		Actions.available({});
	}

	render() {
		return (
			<Drawer
				isPassenger = {this.state.isPassenger}
				role = {'role'}
				resObj = {this.props.resObj}
				ref={(_drawer) => this.drawer = _drawer}>

				<Container>
          <Header style={{backgroundColor:'rgb(72, 110, 255)'}}>
            <Left style={{flex: 1}}>
              <Button transparent onPress={this.openMenu}>
                <Icon name='menu' />
              </Button>
            </Left>

            <Body style={{flex: 1}}>
              <Title style={{alignSelf: 'center', fontFamily: 'sans-serif'}}>Choice</Title>
            </Body>

            <Right style={{flex: 1}}/>
          </Header>

					<Content style={{backgroundColor:'#fff'}}>
						<View style={{paddingLeft:15, paddingRight: 15}}>
							<TouchableOpacity onPress = {() => {this.submitDriver()}}>
								<Text style = {{backgroundColor:'rgb(72, 110, 255)', textAlign:'center', height:60, color:'#fff', fontSize:18, paddingTop:14, marginTop:200, fontFamily: 'sans-serif'}}>
									Driver
								</Text>
							</TouchableOpacity>

							<TouchableOpacity onPress = {() => {this.submitPassenger()}}>
								<Text style = {{backgroundColor:'rgb(72, 110, 255)', textAlign:'center', height:60, color:'#fff', fontSize:18, paddingTop:14, marginTop:25, fontFamily: 'sans-serif'}}>
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

module.exports = Choice;

AppRegistry.registerComponent("Choice", () => Choice);
