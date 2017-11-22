import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
<<<<<<< HEAD
	StatusBar,
	RefreshControl,
	ScrollView
} from "react-native";
import {Actions } from 'react-native-router-flux';

import { Container, Header, Left, Icon, Body, Right, Button, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem, Fab } from 'native-base';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
=======
	FlatList
} from "react-native";
import {Actions } from 'react-native-router-flux';

import { Container, Header, Left, Icon, Body, Right, Button, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';

>>>>>>> master
import config from "./../../config";


class DriverView extends Component {
	//this is the main driver page where you can see the rides you have posted

	constructor(props){
<<<<<<< HEAD
		super(props);
		this.openMenu = this.openMenu.bind(this);
		this.openNotifications = this.openNotifications.bind(this);
		this.baseUrl = config()
		this.state = {
			data: [],
			refreshing: false
		}
	}

	openNotifications(){
		this.notifications.openDrawer();
	}

	openMenu() {
		this.drawer.openDrawer();
	}


	postButton(){
		let resObj = this.props.resObj;
		Actions.ridePosting({resObj});
	}
=======
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
>>>>>>> master

	retrievePosts(){
		return fetch(this.baseUrl + this.props.resObj.email + '/driverView', {
			method: "GET"
		})
<<<<<<< HEAD
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
								<CardItem style={{marginBottom: 20, marginLeft: 5, marginRight: 5, backgroundColor: 'rgb(72, 110, 255)'}} button onPress={() => Actions.driverRideProfile({resObjRide, resObjDriver})}>
									<Body>
										<Text style={{color: '#fff'}}>From: {resObj[i].from}</Text>
										<Text style={{color: '#fff'}}>To: {resObj[i].to}</Text>
										<Text style={{color: '#fff'}}>Date: {resObj[i].date}</Text>
										<Text style={{color: '#fff', left: 275}}>Price: ${resObj[i].price}</Text>
									</Body>
								</CardItem>
=======
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
>>>>>>> master
							</View>
						);
					}
					this.setState({data: dataSet});
<<<<<<< HEAD
				})
			}
		}, (err) => {
			alert(err)
		});
	}

	componentDidMount(){
		this.retrievePosts();
	}

	onRefresh(){
		this.setState({refreshing:true});
		this.retrievePosts().then(()=> {
			this.setState({refreshing:false});
		})
	}

	// <View style={{paddingBottom: 20, backgroundColor: '#fff'}} />
	// <Content style={{backgroundColor: '#fff'}}>
	// </Content>

	render() {
		//retrieve data from the db and then add the reqobj in to an array and then push this array in to lists, and create the list.
		let resObj = this.props.resObj;
		// try putting statusbar after Notifications tag
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
								<Title style={{fontFamily: 'sans-serif'}}>DASHBOARD</Title>
							</Body>
							<Right style = {{flex: 1}}>
								<Button onPress = {() => {this.openNotifications()}} transparent>
									<Icon name='notifications' />
								</Button>
							</Right>
						</Header>
						<View style={{paddingBottom: 20, backgroundColor: '#fff'}} />
						<ScrollView
							refreshControl={<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.onRefresh.bind(this)}
							/>}
							style={{backgroundColor: '#fff'}}
							>
								{this.state.data}
						</ScrollView>
							<View>
								<Fab
									active={this.state.active}
									direction="up"
									containerStyle={{ }}
									style={{ backgroundColor: 'rgb(72, 110, 255)' }}
									position="bottomRight"
									onPress={() => {this.postButton()}}>
									<Icon name="add" />
								</Fab>
							</View>
						</Container>
					</Drawer>
				</Notifications>
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
=======
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
>>>>>>> master
