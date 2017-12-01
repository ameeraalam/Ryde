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
			<Swipeout right = {this.swipeOutButtons} autoClose = {true} style={{backgroundColor:'white'}}>
					<Card>
						<CardItem>
							<Body style={{backgroundColor: 'white'}}>
								<Icon name ='person' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}>
								<Text>{this.props.firstName} {this.props.lastName}</Text></Icon>

								<Icon name='mail' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text>{this.props.email}</Text></Icon>

								<Icon name='call' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text> {this.props.phone}</Text></Icon>
								
							</Body>
						</CardItem>
					</Card>
			</Swipeout>
		);
	}
}

module.exports = CardSlide;

AppRegistry.registerComponent("CardSlide", () => CardSlide);
