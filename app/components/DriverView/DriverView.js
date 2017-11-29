import React, { Component } from 'react';
import {
<<<<<<< HEAD
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import {Actions } from 'react-native-router-flux';
import { Container, Header, Left, Icon, Body, Right, Button, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';

import config from "./../../config";

class DriverView extends Component {

  constructor(props){
    super(props);
    this.address = config.ip;
    this.baseUrl = "http://" + this.address + ":3000/";
    this.state = {
       data: []
      }
  }

  postButton(){

    let resObj = this.props.resObj;
    Actions.ridePosting({resObj});
  }

  searchButton(){

    let resObj = this.props.resObj;
    Actions.rideSearch({resObj});
  }

  retrievePosts(){
    return fetch(this.baseUrl + this.props.resObj.email + '/driverView', {
      method: "GET"
    })
      .then((response) => {
        if(response.status === 200) {
          resObjPromise = response.json();

          resObjPromise.then((resObj) => {
            //alert(JSON.stringify(resObj));
            dataSet = [];
            for(let i=0;i<resObj.length; i++){
              let resO = resObj[i];
            dataSet.push(
              <View>
              <CardItem button onPress={() => Actions.driverProfile({resO})}>
                <Body>
                  <Text>From: {resObj[i].from}</Text>
                  <Text>To: {resObj[i].to}</Text>
                  <Text style={{right: 15}}>Date: {resObj[i].date}</Text>
                </Body>
              </CardItem>
              <Text> </Text>
              </View>
            );
          }
          this.setState({data: dataSet});
          })
        }

        else { alert('Could not retrieve data');
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
    return (
      
      <View>
        {/*Button to use the postButton function with an image being used for the button*/}
        <TouchableOpacity onPress = {() => {this.postButton()}}>
          <Image
            source = {require("./images/postImage.jpg")}
          />
        </TouchableOpacity>

        
      
      </View>
=======
	AppRegistry,
	StyleSheet,
	Text,
	View,
	FlatList
} from "react-native";
import {Actions } from 'react-native-router-flux';

import { Container, Header, Left, Icon, Body, Right, Button, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';
class DriverView extends Component {
	//this is the main driver page where you can see the rides you have posted

	constructor(props){
	super(props);
	this.address = "192.168.0.30";
	this.baseUrl = "http://" + this.address + ":3000/";
	this.state = {
			data: []
		}
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
							let resO = resObj[i];
							let myRes = this.props.resObj;
						dataSet.push(
							<View key={i}>
							<CardItem button onPress={() => Actions.driverProfile({resO,myRes})}>
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

				else { alert('You have not posted any rides yet.');
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
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Left>
            <Button transparent>
                <Icon name='notifications' />
            </Button>
          </Left>
          <Body>
            <Title>RYDE</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='add' />
            </Button>
          </Right>
        </Header>
				<Content>
				{this.state.data}
				</Content>
      </Container>

>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
    );
  }
}

const styles = StyleSheet.create({
     text: {
        color: 'white',
        fontSize: 16,
     },

<<<<<<< HEAD
     flatlist: {
       marginTop: 25,
       flex: 1
     },

     price: {
       marginRight: 15,
       textAlign: 'right'
     }
=======
		 flatlist: {
			 marginTop: 25,

			 flex: 1
		 },

		 price: {
			 marginRight: 15,
			 textAlign: 'right'

		 }
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
});


module.exports = DriverView;

AppRegistry.registerComponent("DriverView", () => DriverView);
