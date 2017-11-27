import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity,
	StatusBar,
	ScrollView
} from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Center, Footer,
	FooterTab, Body, Content, Card, CardItem, Grid, Row, Col } from "native-base";
import { Actions } from "react-native-router-flux";
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import CardSlide from "./CardSlide";
import config from "./../../config";


class ViewMembers extends Component {
	constructor(props) {
		super(props);
		this.openMenu = this.openMenu.bind(this);
		// binds the function as it will get passed around to a child environment, where the child will be
		// triggering the function and it is important that the this of the function remains of that of the parents scope
		this.removePassenger = this.removePassenger.bind(this);
		this.state = {
			members: []
		}
	}

	openMenu() {
		this.drawer.openDrawer();
	}

	// the self is the this of the CardSlide
	removePassenger(self) {

		// this array is a placeholder for the state.members array
		// this array will get modified, and then I will change the member state to this array
		let members = this.state.members;

		// we loop over the members in this scope
		for (let i = 0; i < members.length; ++i) {
			// if the card selected has the id which matches one of the member's array's id
			// that means we found the card selected and we remove that card from the list of cards stored in an array as a state
			if (members[i].props.id == self.props.id) {
				alert(self.props.id);

				members.splice(members[i].props.id, 1)

				// we have found what we wanted using the loop and no longer need the loop to continue
				// and therefore we exit the loop
				break;
			}
		}


	}

	// when the component is about to mount we set the state
	componentWillMount() {
		let ryde = this.props.resObjRyde;

		// contains cards of the members
		let memberCards = []

		// TO DO LINK CARDS TO PASSENGER PROFILE

		// we loop over the members of the ryde members and populate the cards
		for (let i = 0; i < ryde.members.length; ++i) {
			// id needs to be passed to keep track of which array they are in
			memberCards.push(<CardSlide key = {i} id = {i} removePassenger = {this.removePassenger} firstName = {ryde.members[i].firstName} lastName = {ryde.members[i].lastName} email = {ryde.members[i].email} phone = {ryde.members[i].phone}/>)
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
								<Title style={{fontFamily: 'sans-serif'}}>Members</Title>

							</Body>
							<Right style = {{flex: 1}}>
								<Button onPress = {() => {this.openNotifications()}} transparent>
									<Icon name='notifications' />
								</Button>
							</Right>
						</Header>
						<ScrollView>
							{this.state.members}
						</ScrollView>
					</Container>
			</Drawer>
		</Notifications>

		)
	}

}

module.exports = ViewMembers;

AppRegistry.registerComponent("ViewMembers", () => ViewMembers);
