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
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";

class Rating extends Component {
	constructor(props) {
		super(props);
		this.openMenu = this.openMenu.bind(this);
		this.state = {
			members: []
		}
	}

	openMenu() {
		this.drawer.openDrawer();
	}

	// when the component is about to mount we set the state
	componentWillMount() {
		let ryde = this.props.resObjRyde;

		// contains cards of the members
		let memberCards = []

		// TO DO LINK CARDS TO PASSENGER PROFILE

		// we loop over the members of the ryde members and populate the cards
		for (let i = 0; i < ryde.members.length; ++i) {
			memberCards.push(
			            <CardItem key = {i}>
			              <Body>
			                <Text>
								some Text
						    </Text>
			              </Body>
			            </CardItem>
				  )
		}
		// set the state
		this.setState({members: memberCards});

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
								<Title style={{fontFamily: 'sans-serif'}}>Rating</Title>
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

module.exports = Rating;

AppRegistry.registerComponent("Rating", () => Rating);
