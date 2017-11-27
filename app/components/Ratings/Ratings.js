import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity,
	StatusBar,
	Easing
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

class Ratings extends Component {
	constructor(props) {
		super(props);
		this.openMenu = this.openMenu.bind(this);
		this.state = {
			members: [],
			starCount: []
		}
	}

	openMenu() {
		this.drawer.openDrawer();
	}

	// when the component is about to mount we set the state
	componentWillMount() {
		let ryde = this.props.resObjRyde;

		// contains cards of the members
		let memberCards = [];

		let stars = [];

		for (let i = 0; i < ryde.members.length; ++i) {
			stars.push(0);
		}

		this.setState({starCount: stars}, () => {
			// we loop over the members of the ryde members and populate the cards
			for (let i = 0; i < ryde.members.length; ++i) {
				memberCards.push(
				            <CardItem key = {i}>
				              <Body>
							  	  <Text>Name: {ryde.members[i].firstName} {ryde.members[i].lastName} </Text>
								  <Rating
								      onChange={rating => console.log(rating)}
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
					  )
			}
			// set the state
			this.setState({members: memberCards});
		});
	}

	render() {
		return (
			<Notifications
				ref={(notifications) => (this.notifications = notifications)}>
				<Drawer
					ref={(drawer) => this.drawer = drawer}>
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
						<Card>
							{this.state.members}
						</Card>
					</Container>
			</Drawer>
		</Notifications>

		)
	}

}

module.exports = Ratings;

AppRegistry.registerComponent("Ratings", () => Ratings);
