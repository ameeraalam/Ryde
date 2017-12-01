import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import { Container, Header, Left, Icon, Body, Button, Right, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem, Item, Picker} from 'native-base';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";

class RideBrowser extends Component{

    constructor(props){
        super(props);
        this.baseUrl = config();
        this.openMenu = this.openMenu.bind(this);
        this.openNotifications = this.openNotifications.bind(this);
        this.state = {rydes: [], user: ""};
    }

    sortBrowser(){

    	let allRydes = [];
    	let currentPassenger = this.props.passedResObj;
        let currentRyde = null;
        let indexCount = 0;
        let rydeForButton = [];
        let searchResult = this.props.resObj.dest;
		let length = searchResult.length;

		// Sorting by price
		if (this.state.user === "price"){

	        for (let i = 0; i < length-1; i++){

	        	for (let  j = 0; j < length - i - 1; j++){

	        		if (searchResult[j].price > searchResult[j+1].price){

	        			let temp = searchResult[j];
	        			searchResult[j] = searchResult[j+1];
	        			searchResult[j+1] = temp;
	        		}
	        	}
	        }
	    }

	    // Sorting by luggage spots
	    if (this.state.user === "luggage"){

	    	for (let i = 0; i < length-1; i++){

	        	for (let  j = 0; j < length - i - 1; j++){

	        		if (searchResult[j].numLuggage < searchResult[j+1].numLuggage){

	        			let temp = searchResult[j];
	        			searchResult[j] = searchResult[j+1];
	        			searchResult[j+1] = temp;
	        		}
	        	}
	        }
	    }

	    // Sorting by available seats
	    if (this.state.user === "seats"){

	    	for (let i = 0; i < length-1; i++){

	        	for (let  j = 0; j < length - i - 1; j++){

	        		if (searchResult[j].numPassengers < searchResult[j+1].numPassengers){

	        			let temp = searchResult[j];
	        			searchResult[j] = searchResult[j+1];
	        			searchResult[j+1] = temp;
	        		}
	        	}
	        }
	    }


        // Clearing current cards
    	this.setState({rydes: allRydes});

    	for (let i = 0; i < searchResult.length;  i++){

            currentRyde = searchResult[i];

            if (this.props.passedResObj.email === currentRyde.driver){
            	continue;
            }

            rydeForButton.push(currentRyde);
            let resObjRyde = rydeForButton[indexCount];

            allRydes.push(
                <View key={i}>
                  	<Card style={{marginBottom: 20, marginLeft: 5, marginRight: 5}}>
                    	<CardItem button onPress={() => Actions.passengerSearchProfile({currentPassenger, resObjRyde})}>
                    		<Body>
                    			<Icon name = 'person' style={{color: 'rgb(0, 51, 153)'}}><Text style={{color: 'rgb(0, 51, 153)'}}> {currentRyde.firstName + " " + currentRyde.lastName}</Text></Icon>
                    			<Icon name = 'calendar' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0,51,153)'}}> {currentRyde.date}</Text></Icon>
                    			<Icon name = 'cash' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}> {currentRyde.price}</Text></Icon>
                    			<Icon name='briefcase' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}> {currentRyde.numLuggage}</Text></Icon>
                    			<Icon name='contact' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}> {currentRyde.numPassengers}</Text></Icon>
                    		</Body>
                    	</CardItem>
                  	</Card>
                </View>
            );

            indexCount++;
        }

        this.setState({rydes: allRydes});
	}

    updateBrowser = (value) => {

    	this.setState({user: value}, () => {
 			this.sortBrowser();
   		});
    }

    openNotifications(){
      this.notifications.openDrawer();
    }

    openMenu() {
      this.drawer.openDrawer();
    }


    componentDidMount(){
        this.loadRydes();
    }

    loadRydes(){

		let allRydes = [];
        let currentPassenger = this.props.passedResObj;
        let currentRyde = null;
        let indexCount = 0;
        let rydeForButton = [];

        for (let i = 0; i < this.props.resObj.dest.length;  i++){

            currentRyde = this.props.resObj.dest[i];

            if (this.props.passedResObj.email === currentRyde.driver){
            	continue;
            }

            rydeForButton.push(currentRyde);
            let resObjRyde = rydeForButton[indexCount];

            allRydes.push(
                <View key={i}>
                  <Card style={{marginBottom: 20, marginLeft: 5, marginRight: 5}}>
                    <CardItem button onPress={() => Actions.passengerSearchProfile({currentPassenger, resObjRyde})}>
                    <Body>
                    <Icon name = 'person' style={{color: 'rgb(0, 51, 153)'}}><Text style={{color: 'rgb(0, 51, 153)'}}> {currentRyde.firstName + " " + currentRyde.lastName}</Text></Icon>
                    <Icon name='calendar' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0,51,153)'}}> {currentRyde.date}</Text></Icon>
                    <Icon name='cash' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}> {currentRyde.price}</Text></Icon>
                    <Icon name='briefcase' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}> {currentRyde.numLuggage}</Text></Icon>
                    <Icon name='contact' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}> {currentRyde.numPassengers}</Text></Icon>
                    </Body>
                    </CardItem>
                  </Card>
                </View>
            );

            indexCount++;
        }

        this.setState({rydes: allRydes});
    }

  render(){

    return(

      <Notifications
				ref={(notifications) => (this.notifications = notifications)}>
				<Drawer
					ref={(drawer) => this.drawer = drawer}>
					<Container style={{backgroundColor:'white'}}>
						<Header style={{backgroundColor: 'rgb(0, 51, 153)'}}>
							<Left style={{flex: 0}}>
								<Button transparent onPress={this.openMenu}>
									<Icon name='menu' />
								</Button>
							</Left>
							<Body style={{alignItems: 'center', flex: 1}}>
								<Title style={{fontFamily: 'sans-serif'}}>Rides</Title>
							</Body>
							<Right style={{flex: 0}}>
								<Button onPress = {() => {this.openNotifications()}} transparent>
									<Icon name='notifications' />
								</Button>
							</Right>
						</Header>
        <Content>
        	<Picker selectedValue = {this.state.user}
        			mode = "dropdown"
        			onValueChange = {(value) => this.updateBrowser(value)}>
        		<Item label = "Sort by" value = "nothing" />
        		<Item label = "Price" value = "price" />
        		<Item label = "Seats" value = "seats" />
        		<Item label = "Luggage" value = "luggage" />
        	</Picker>
            {this.state.rydes}
      </Content>
    </Container>
  </Drawer>
</Notifications>

    );
  }
}

const styles = StyleSheet.create({

    mainStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },

    inputBox: {
      height: 40,
      width: 200,
      borderColor: '#000000',
      borderWidth: 1
    },

  welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: '#000000',
    },

    instructions: {
      textAlign: 'center',
      color: '#FFFFFF',
      marginBottom: 5,
    },

    myImage: {
      justifyContent: 'center',
      alignItems: 'center'
    }
});

module.exports = RideBrowser;
AppRegistry.registerComponent("RideBrowser", () => RideBrowser);
