/* Author: Md. Tanvir Islam */

import React, { Component } from "react";

import {
	AppRegistry,
	ScrollView,
	TouchableOpacity
} from "react-native";

import {  
	View,  
	Card, 
	CardItem,  
	Text,
	Icon
} from 'native-base';

import { Actions } from "react-native-router-flux";

import styles from "./styles";

import config from "./../../config";

import Swipeout from "react-native-swipe-out";

class CardSlide extends Component {
	constructor(props) {
		super(props);
		this.swipeOutButtons = [{
			text: "Accept",
			backgroundColor: "#86e079",
			onPress: () => {this.props.acceptPassenger()}
		}, {
			text: "Reject",
			backgroundColor: "#e54747",
			onPress: () => {this.props.rejectPassenger()}
		}];
	}

	render() {
		return(
			<Swipeout right = {this.swipeOutButtons} autoClose = {true}>
				<TouchableOpacity activeOpacity = {100} onPress = {() => {this.props.getIndex()}}>
					<Card>
						<CardItem>
							<Text>Ryde-Id: {this.props.id}, First Name: {this.props.firstName} Last Name: {this.props.lastName}, Rating: {this.props.rating}</Text>
						</CardItem>
					</Card>
				</TouchableOpacity>
			</Swipeout>
		);
	}
}

module.exports = CardSlide;

AppRegistry.registerComponent("CardSlide", () => CardSlide);