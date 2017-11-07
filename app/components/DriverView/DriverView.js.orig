import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	FlatList
} from "react-native";
import {Actions } from 'react-native-router-flux';

import { Container, Header, Left, Icon, Body, Right, Button, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';

import config from "./../../config";


class DriverView extends Component {
	//this is the main driver page where you can see the rides you have posted

	constructor(props){
	super(props);
	this.address = config.ip
	this.baseUrl = "http://" + this.address + ":3000/";
	this.state = {
			data: []
		}
	}

	postButton(){
    	let resObj = this.props.resObj;
    	Actions.ridePosting({resObj});
  	}

	retrievePosts(){
		return fetch(this.baseUrl + this.props.resObj.email + '/driverView', {
			method: "GET"
		})
			.then((response) => {
				if(response.status === 200) {
					resObjPromise = response.json();

					resObjPromise.then((resObj) => {
						dataSet = [];
						for(let i=0;i<resObj.length; i++){
							let resObjRide = resObj[i]; //ride information
							let resObjDriver = this.props.resObj; //driver information
						dataSet.push(
							<View key={i}>
							<CardItem button onPress={() => Actions.driverRideProfile({resObjRide, resObjDriver})}>
								<Body>
									<Text>From: {resObj[i].from}</Text>
									<Text>To: {resObj[i].to}</Text>
									<Text>Date: {resObj[i].date}</Text>
									<Text style={{left: 275}}>Price: ${resObj[i].price}</Text>
								</Body>
							</CardItem>
							<Text> </Text>
							</View>
						);
					}
					this.setState({data: dataSet});
					})
				}
			}, (err) => {
				alert(err)
			});
  }

  componentDidMount(){
		this.retrievePosts();
	}

  render() {
	//retrieve data from the db and then add the reqobj in to an array and then push this array in to lists, and create the list.
    
    let resObj = this.props.resObj;

    return (
      <Container>
        <Header>
          <Left style = {{flex: 1}}>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body style = {{flex: 1}}>
            <Title>Dashboard</Title>
          </Body>
          <Right style = {{flex: 1}}>
            <Button onPress = {() => {this.postButton()}} transparent>
              <Icon name='add' />
            </Button>
          </Right>
        </Header>
				<Content>
				{this.state.data}
				</Content>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
     text: {
        color: 'white',
        fontSize: 16,
     },

		 flatlist: {
			 marginTop: 25,

			 flex: 1
		 },

		 price: {
			 marginRight: 15,
			 textAlign: 'right'

		 }
});

module.exports = DriverView;

AppRegistry.registerComponent("DriverView", () => DriverView);
