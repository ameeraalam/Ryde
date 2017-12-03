import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity,
	StatusBar,
	Easing,
	ScrollView,
	BackHandler,
	StyleSheet,
	ActivityIndicator
} from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Center, Footer,
	FooterTab, Body, Content, Card, CardItem, Grid, Row, Col, Toast } from "native-base";
import { Actions } from "react-native-router-flux";
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import Rating from 'react-native-rating'
import config from "./../../config";

const images = {
  starFilled: require('./star_filled.png'),
  starUnfilled: require('./star_unfilled.png')
}

// THIS PAGE ONLY NEEDS THE RYDE OBJECT TO FUNCTION

class DriverRatings extends Component {
	constructor(props) {
		super(props);
		this.baseUrl = config();
		this.openMenu = this.openMenu.bind(this);
		this.ratings = -1;
		this.state= {
			loading: false,
			showToast: false
		}
	}

	openMenu() {
		this.drawer.openDrawer();
	}

	openNotifications(){
		this.notifications.openDrawer();
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			// this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
			// Typically you would use the navigator here to go to the last state.
			let resObj = this.props.resObjUser;
			Actions.passengerView({resObj});
			return true;

		});
	}


	submitRatings() {
		let reqObj = {
			rydeObj: this.props.resObjRyde,
			ratings: this.ratings
		}
		this.setState({loading: true});
		// a get request needs to be made so the server can retrieve the messages
		fetch(this.baseUrl + "driverRatings", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {
			this.setState({loading: false});
			if (res.status === 200) {



				// ON SUBMIT SHOULD TAKE YOU BACK TO THE PREVIOUS PAGE YOU WERE
				Actions.pop();



			} else {
				Toast.show({
				text: 'Server error',
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
		});

	}

	render() {
		return (
			<Notifications
				ref={(notifications) => (this.notifications = notifications)}>
				<Drawer
					ref={(drawer) => this.drawer = drawer}>
					<Container style={{backgroundColor: 'white'}}>
						<Header style={{backgroundColor: 'rgb(0, 51, 153)'}}>
							<StatusBar
								backgroundColor="rgb(0, 51, 153)"
								barStyle="light-content"
								hidden = {false}
								/>
							<Left style = {{flex: 1}}>
								<Button transparent onPress={this.openMenu}>
									<Icon name='menu' />
								</Button>
							</Left>
							<Body style={{alignItems: 'center', flex: 1}}>
								<Title style={{fontFamily: 'sans-serif'}}>Rate</Title>
							</Body>
							<Right style = {{flex: 1}}>
								<Button onPress = {() => {this.openNotifications()}} transparent>
									<Icon name='notifications' />
								</Button>
							</Right>
						</Header>

						<Content style={{backgroundColor: 'white'}}>
						<Card>
							<CardItem>
								<Body>
									<Icon name='person' style={{color: 'rgb(0, 51, 153)'}}><Text style={{color: 'rgb(0, 51, 153)'}}>{this.props.resObjRyde.firstName} {this.props.resObjRyde.lastName} </Text></Icon>
									<Rating
										onChange={(rating) => {
											// the rating belonging the member at index i has the following rating
											// i is the same for both member array and rating array
											// as they are identical
											this.ratings = rating;
										}}
										selectedStar={images.starFilled}
										unselectedStar={images.starUnfilled}
										config={{
										  easing: Easing.inOut(Easing.ease),
										  duration: 350
										}}
										stagger={80}
										maxScale={1.4}
										starStyle={{
										  width: 30,
										  height: 30
										}}
									/>
								</Body>
							</CardItem>
						</Card>

						<TouchableOpacity style={{marginTop: '50%'}} onPress = { () => { this.submitRatings(); }}><Text style = {styles.submitButton}> Submit </Text></TouchableOpacity>

						</Content>
					</Container>
			</Drawer>
		</Notifications>

		)
	}

}

const styles = StyleSheet.create({

	submitButton: {
		backgroundColor:'rgb(0, 51, 153)',
		textAlign:'center',
		height:54,
		color:'#fff',
		fontSize:18,
		paddingTop:14,
		fontFamily: 'sans-serif',
		marginTop: '50%',
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 20
	}
});
module.exports = DriverRatings;

AppRegistry.registerComponent("Ratings", () => DriverRatings);
