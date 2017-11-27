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
	ScrollView
} from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Center, Footer,
	FooterTab, Body, Content, Card, CardItem, Grid, Row, Col } from "native-base";
import { Actions } from "react-native-router-flux";
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import Rating from 'react-native-rating'
import config from "./../../config";

const images = {
  starFilled: require('./star_filled.png'),
  starUnfilled: require('./star_unfilled.png')
}

class DriverRatings extends Component {
	constructor(props) {
		super(props);
		this.baseUrl = config();
		this.openMenu = this.openMenu.bind(this);
		this.ratings = -1;
	}

	openMenu() {
		this.drawer.openDrawer();
	}

	submitRatings() {
		let reqObj = {
			rydeObj: this.props.resObjRyde,
			ratings: this.ratings
		}

		// a get request needs to be made so the server can retrieve the messages
		fetch(this.baseUrl + "driverRatings", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {
			if (res.status === 200) {





			} else {
				alert("Server error");
			}
		}, (err) => {
			alert(err);
		});

	}

	render() {
		return (
			<Notifications
				ref={(notifications) => (this.notifications = notifications)}>
				<Drawer
					ref={(drawer) => this.drawer = drawer}>
					<ScrollView>
					<Container>
						<Header style={{backgroundColor: 'rgb(72, 110, 255)'}}>
							<StatusBar
								backgroundColor="rgb(72, 110, 255)"
								barStyle="light-content"
								hidden = {false}
								/>
							<Left style = {{flex: 1}}>
								<Button transparent onPress={this.openMenu}>
									<Icon name='menu' />
								</Button>
							</Left>
							<Body style={{flex: 1}}>
								<Title style={{fontFamily: 'sans-serif'}}>Ratings</Title>
							</Body>
							<Right style = {{flex: 1}}>
								<Button onPress = {() => {this.openNotifications()}} transparent>
									<Icon name='notifications' />
								</Button>
							</Right>
						</Header>

						<Text>{this.props.resObjRyde.firstName} {this.props.resObjRyde.lastName} </Text>
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
							  width: 60,
							  height: 60
							}}
						/>

						<Button medium info onPress = { () => {
							this.submitRatings();
						}}>
						 	<Text> Submit </Text>
						</Button>

					</Container>
					</ScrollView>
			</Drawer>
		</Notifications>

		)
	}

}

module.exports = DriverRatings;

AppRegistry.registerComponent("Ratings", () => DriverRatings);
