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

import { Container, Header, Left, Icon, Body, Right, Button, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem, Fab, Badge, Toast } from 'native-base';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";


class DriverView extends Component {
	//this is the main driver page where you can see the rides you have posted

	constructor(props){
		super(props);
		this.openMenu = this.openMenu.bind(this);
		this.openNotifications = this.openNotifications.bind(this);
		this.setBadge = this.setBadge.bind(this);
		this.baseUrl = config()
		this.state = {
			data: [],
			refreshing: false,
			placeBadge: false,
			refresh: false,
			showToast: false
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
    if(num > 0){
			// if(this._isMounted){
       	this.setState({placeBadge: true});
			// }
    } else {
			// if(this._isMounted){
	      this.setState({placeBadge: false});
			// }
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
					let resObjDriver = this.props.resObj; //driver information
					let {isPassenger, driverFilledObj} = this.props;

					for(let i=0;i<resObj.length; i++){
						let resObjRide = resObj[i]; //ride information
						dataSet.push(
							<View key={i}>
								<Card style={{marginBottom: 20, marginLeft: 5, marginRight: 5}}>
									<CardItem button onPress={() => Actions.driverRideProfile({resObjRide, resObjDriver})}>

										<Body>
											<Icon name='pin' style={{color: 'rgb(0, 51, 153)'}}><Text style={{color: 'rgb(0, 51, 153)'}}> {resObj[i].from} - {resObj[i].to}</Text></Icon>
											
											<Icon name='calendar' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}>  {resObj[i].date}</Text></Icon>

											<Icon name='cash' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}> {resObj[i].price}</Text></Icon>


										</Body>
									</CardItem>
								</Card>
							</View>
						);
					}

					this.setState({data: dataSet});
				})
			}
		}, (err) => {
			Toast.show({
				text: 'Promise Error:\nUnhandled promise',
				position: 'top',
				buttonText: 'Okay',
				duration: 3000
			});
		});
	}

	componentDidMount(){
		this._isMounted = true;
		this.retrievePosts();
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
					<Container style={{backgroundColor:'white'}}>
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
						<Button badge onPress = {() => {this.openNotifications()}} transparent>
							{this.state.placeBadge && displayBadge}
						<Icon name='notifications' />
						</Button>
						</Right>
						</Header>
						<Content
						refreshControl={<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.onRefresh.bind(this)}
							colors={['red']}
							/>}
							style={{backgroundColor: '#fff'}}
							>
							{this.state.data}
							</Content>
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
