/* Author: Md. Tanvir Islam */

import React, { Component } from "react";

import {
	AppRegistry,
	ScrollView
} from "react-native";

import {
	View,
	Card,
	CardItem,
	Text,
	Icon,
	Body
} from 'native-base';

import { Actions } from "react-native-router-flux";

import styles from "./styles";

import config from "./../../config";

import Swipeout from "react-native-swipeout";

class CardSlide extends Component {
	constructor(props) {
		super(props);
		this.swipeOutButtons = [{
			text: "Accept",
			backgroundColor: "#86e079",
			// we pass the child's this to the parent's acceptPassenger function
			// so the parent's acceptPassenger scoped function can manipulate the child's props
			onPress: () => {this.props.acceptPassenger(this)}
		}, {
			text: "Reject",
			backgroundColor: "#e54747",
			onPress: () => {this.props.rejectPassenger(this)}
		}];
	}

	render() {
		let self = this;
		return(
				<Swipeout right = {this.swipeOutButtons} autoClose = {true} style={{backgroundColor: 'white'}}>
						<Card>
							<CardItem>
								<Body style={{backgroundColor: 'white'}}>
									<Icon name='person' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}> {self.props.firstName} {self.props.lastName}</Text></Icon>

									<Icon name='mail' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}>{self.props.email}</Text></Icon>

									<Icon name='star-half' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}>{self.props.rating}</Text></Icon>
								</Body>
							</CardItem>
						</Card>
				</Swipeout>
		);
	}
}

module.exports = CardSlide;

AppRegistry.registerComponent("CardSlide", () => CardSlide);
