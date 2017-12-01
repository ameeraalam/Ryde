import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	StatusBar,
	RefreshControl,
<<<<<<< HEAD
	ScrollView,
} from "react-native";
import {Actions } from 'react-native-router-flux';

import { Container, Header, Left, Icon, Body, Right, Button, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem, Fab, Toast } from 'native-base';
=======
	ScrollView
} from "react-native";
import {Actions } from 'react-native-router-flux';

import { Container, Header, Left, Icon, Body, Right, Button, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem, Fab } from 'native-base';
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";


class DriverView extends Component {
	//this is the main driver page where you can see the rides you have posted

	constructor(props){
		super(props);
		this.openMenu = this.openMenu.bind(this);
		this.openNotifications = this.openNotifications.bind(this);
		this.baseUrl = config()
		this.state = {
			data: [],
<<<<<<< HEAD
			refreshing: false,
			showToast: false
=======
			refreshing: false
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
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
<<<<<<< HEAD
							<Card style={{marginBottom: 20, marginLeft: 5, marginRight: 5}}>
							<CardItem button onPress={() => Actions.driverRideProfile({resObjRide, resObjDriver})}>
							<Body>
							<Icon name='pin' style={{color: 'rgb(0, 51, 153)'}}><Text style={{color: 'rgb(0, 51, 153)'}}> {resObj[i].from} - {resObj[i].to}</Text></Icon>
							<Icon name='calendar' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}>  {resObj[i].date}</Text></Icon>
							<Icon name='cash' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}> {resObj[i].price}</Text></Icon>
							</Body>
							</CardItem>
							</Card>
=======
								<CardItem style={{marginBottom: 20, marginLeft: 5, marginRight: 5, backgroundColor: 'rgb(72, 110, 255)'}} button onPress={() => Actions.driverRideProfile({resObjRide, resObjDriver})}>
									<Body>
										<Text style={{color: '#fff'}}>From: {resObj[i].from}</Text>
										<Text style={{color: '#fff'}}>To: {resObj[i].to}</Text>
										<Text style={{color: '#fff'}}>Date: {resObj[i].date}</Text>
										<Text style={{color: '#fff', left: 275}}>Price: ${resObj[i].price}</Text>
									</Body>
								</CardItem>
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
							</View>
						);
					}
					this.setState({data: dataSet});
				})
			}
		}, (err) => {
<<<<<<< HEAD

			Toast.show({
				text: 'Promise Error:\nUnhandled promise',
				position: 'top',
				buttonText: 'Okay',
				duration: 3000
			});
=======
			alert(err)
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
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

<<<<<<< HEAD
=======
	// <View style={{paddingBottom: 20, backgroundColor: '#fff'}} />
	// <Content style={{backgroundColor: '#fff'}}>
	// </Content>
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a

	render() {
		//retrieve data from the db and then add the reqobj in to an array and then push this array in to lists, and create the list.
		let resObj = this.props.resObj;
		// try putting statusbar after Notifications tag
		return (
			<Notifications
<<<<<<< HEAD
			ref={(notifications) => (this.notifications = notifications)}>

			<Drawer
			ref={(drawer) => this.drawer = drawer}>

			<Container>

			<Header style={{backgroundColor: 'rgb(0, 51, 153)'}}>

			<StatusBar
			backgroundColor="rgb(0, 51, 153)"
			barStyle="light-content"
			hidden = {false}
			/>

			<Left style = {{flex: 1}}>

			<Button transparent onPress={this.openMenu}>

			<Icon name='menu' />

			</Button>
			</Left>

			<Body style={{flex: 1}}>
			<Title style={{fontFamily: 'sans-serif'}}>Dashboard</Title>
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
				colors={['red']}
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
				style={{ backgroundColor: 'rgb(0, 51, 153)' }}
				position="bottomRight"
				onPress={() => {this.postButton()}}>
				<Icon name="add" />
				</Fab>
				</View>
				</Container>
				</Drawer>
=======
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
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
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
