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
	Icon
} from 'native-base';

import { Actions } from "react-native-router-flux";

import config from "./../../config";

import Swipeout from "react-native-swipeout";

class CardSlide extends Component {
	constructor(props) {
		super(props);
		this.swipeOutButtons = [{
			text: "Remove",
			backgroundColor: "#e54747",
			// this is being passed on to the this.props.removePassenger which has an attribute self, which alises this
			onPress: () => {this.props.removePassenger(this)}
		}];
	}

	render() {
		return(
			<Swipeout right = {this.swipeOutButtons} autoClose = {true}>
					<Card>
						<CardItem>
							<Text>Name: {this.props.firstName} {this.props.lastName}, Email: {this.props.email} Phone: {this.props.phone}</Text>
						</CardItem>
					</Card>
			</Swipeout>
		);
	}
}

module.exports = CardSlide;

AppRegistry.registerComponent("CardSlide", () => CardSlide);
