import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	StatusBar,
	RefreshControl,
	ScrollView
} from "react-native";
import {Actions } from 'react-native-router-flux';

import { Container, Header, Left, Icon, Body, Right, Button, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem, Fab, Badge } from 'native-base';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";


class DriverView extends Component {
	//this is the main driver page where you can see the rides you have posted

	constructor(props){
		super(props);
		// console.log(this);
		this.openMenu = this.openMenu.bind(this);
		this.openNotifications = this.openNotifications.bind(this);
		this.setBadge = this.setBadge.bind(this);
		this.baseUrl = config()
		this.state = {
			data: [],
			refreshing: false,
			placeBadge: false,
			refresh: false
		}
	}

	openNotifications() {
		this.notifications.openDrawer();
	}

	openMenu() {
		this.drawer.openDrawer();
	}


	componentWillUnmount() {
		this._isMounted = false;
	}


	setBadge(num) {
		console.log('setBadge ######');
    if(num > 0){
			if(this._isMounted){
       	this.setState({placeBadge: true});
			}
    } else {
			if(this._isMounted){
	      this.setState({placeBadge: false});
			}
		}
  }


	postButton(){
		let {isPassenger, resObj, driverFilledObj} = this.props;
    Actions.ridePosting({isPassenger, resObj, driverFilledObj});
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
					let {isPassenger, driverFilledObj} = this.props;
					for(let i=0;i<resObj.length; i++){
						let resObjRide = resObj[i]; //ride information
						let resObjDriver = this.props.resObj; //driver information
						dataSet.push(
							<View key={i}>
								<CardItem style={{marginBottom: 20, marginLeft: 5, marginRight: 5, backgroundColor: 'rgb(72, 110, 255)'}}
									button onPress={() => Actions.driverRideProfile({isPassenger, resObjRide, resObjDriver, driverFilledObj})}>
									<Body>
										<Text style={{color: '#fff'}}>From: {resObj[i].from}</Text>
										<Text style={{color: '#fff'}}>To: {resObj[i].to}</Text>
										<Text style={{color: '#fff'}}>Date: {resObj[i].date}</Text>
										<Text style={{color: '#fff', left: 275}}>Price: ${resObj[i].price}</Text>
									</Body>
								</CardItem>
							</View>
						);
					}
					if(this._isMounted){
						this.setState({data: dataSet});
					}
				})
			}
		}, (err) => {
			alert(err)
		});
	}

	componentWillMount(){
		this._isMounted = true;
		console.log('componentDidMount in driverView');
		this.retrievePosts();
	}

	componentWillUpdate() {
    console.log('driverView updated');
  }

	onRefresh(){
		if(this._isMounted){
			this.setState({refreshing:true});
		}
		this.retrievePosts().then(()=> {
			if(this._isMounted){
				this.setState({refreshing:false});
			}
		})
	}



	render() {
		let resObj = this.props.resObj;
		let displayBadge = (<Badge style={{ position: 'absolute', right: 14, top: 9, paddingTop: 0,
      paddingBottom: 0, borderRadius: 100, height: 11, zIndex: 1 }}/>);

		return (
			<Notifications
				badgeFunc = {this.setBadge}
				isPassenger={false}
				resObj = {this.props.resObj}
				driverFilledObj = {this.props.driverFilledObj}
				ref={(notifications) => (this.notifications = notifications)}>
				<Drawer
					isPassenger={false}
					resObj = {this.props.resObj}
					driverFilledObj = {this.props.driverFilledObj}
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
								<Button badge onPress = {() => {this.openNotifications()}} transparent>
									{this.state.placeBadge && displayBadge}
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
