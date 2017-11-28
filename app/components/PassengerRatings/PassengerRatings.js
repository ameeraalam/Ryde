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
	BackHandler
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

class PassengerRatings extends Component {
	constructor(props) {
		super(props);
		this.baseUrl = config();
		this.openMenu = this.openMenu.bind(this);
		this.ratings = [];
		this.state = {
			members: []
		}
	}

	openMenu() {
		this.drawer.openDrawer();
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			// this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
			// Typically you would use the navigator here to go to the last state.
			let resObj = this.props.resObjUser;
			Actions.driverView({resObj});
			return true;

		});
	}

	submitRatings() {
		let reqObj = {
			members: this.props.resObjRyde.members,
			ratings: this.ratings
		}

		// a get request needs to be made so the server can retrieve the messages
		fetch(this.baseUrl + "passengerRatings", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {
			if (res.status === 200) {
				let resObj = this.props.resObjUser;
				// on success I change the page to driver view
				Actions.driverView({resObj});
			} else {
				alert("Server error");
			}
		}, (err) => {
			alert(err);
		});

	}

	// when the component is about to mount we set the state
	componentWillMount() {
		// assigning the ryde object to a variable
		let ryde = this.props.resObjRyde;
		// contains cards of the members
		let memberCards = [];

		for (let i = 0; i < ryde.members.length; ++i) {
			this.ratings.push(-1);
		}

		// we loop over the members of the ryde members and populate the cards
		for (let i = 0; i < ryde.members.length; ++i) {
			memberCards.push(
						<Card key = {i}>
							<CardItem key = {i}>
							  <Body>
								  <Text>{ryde.members[i].firstName} {ryde.members[i].lastName} </Text>
								  <Rating
									  onChange={(rating) => {
										  // the rating belonging the member at index i has the following rating
										  // i is the same for both member array and rating array
										  // as they are identical
										  this.ratings[i] = rating;
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
										width: 50,
										height: 50
									  }}
									/>
							  </Body>
							</CardItem>
						</Card>
				  )
		}
		// set the state of members
		this.setState({members: memberCards});
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

						{this.state.members}

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

module.exports = PassengerRatings;

AppRegistry.registerComponent("Ratings", () => PassengerRatings);
