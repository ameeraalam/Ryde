import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, DrawerLayoutAndroid, Image, ScrollView, RefreshControl } from 'react-native';
import { Container, Header, Title, Left, Icon, Text, Right, Button, Center, Footer, FooterTab,
          Body, Content, Card, CardItem, Grid, Row, Col, List, ListItem, Switch, Toast } from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import OneSignal from 'react-native-onesignal';
import config from "./../../config";


class Notifications extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.baseUrl = config();
    this.openDrawer = this.openDrawer.bind(this);
    this.onReceived = this.onReceived.bind(this);
    OneSignal.inFocusDisplaying(0);
    OneSignal.enableSound(true);
    OneSignal.enableVibrate(true);
    this.state = {
      showToast: false,
      notifications: [],
      refreshing: false
    }
  }

  openDrawer() {
    this.notifications.openDrawer();
  }


  onRefresh() {
		if(this._isMounted){
			this.setState({refreshing:true});
		}
		this.retrieveNotifications().then(()=> {
			if(this._isMounted){
				this.setState({refreshing:false});
			}
		})
	}


  componentWillMount() {
    console.log('componentDidMount in in notifications');
    this._isMounted = true;
    this.retrieveNotifications();
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount in notifications');
    this._isMounted = false;
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
  }


  onReceived(notification) {
    console.log("Notification received: ", notification);

    if(notification.isAppInFocus) {
      console.log('app in focus');
      Toast.show({
        text: notification.payload.body,
        position: 'top',
        buttonText: 'Okay',
        duration: 4000
      });
      if(notification.payload.additionalData !== undefined) {
        if(notification.payload.additionalData.type === 'endTrip'){
          console.log('type: ' + notification.payload.additionalData.type);
          // Actions.rateTrip();
          Actions.register();
        }
      }
    }
    this.retrieveNotifications();
  }


  onOpened(openResult) {
    console.log('openResult: ', openResult);
    if(!notification.isAppInFocus) {
      console.log('app not in focus');
      if(notification.payload.additionalData !== undefined) {
        if(notification.payload.additionalData.type === 'endTrip'){
          console.log('type: ' + notification.payload.additionalData.type);
          // Actions.rateTrip();
          Actions.register();
        }
      } else {
        Actions.login();
      }
    }
  }


  handlePassengerNotificationOnPress(resO, rydeIndex) {
    let myRes = this.props.resObj;
    let {isPassenger, driverFilledObj} = this.props;

    let {email} = this.props.resObj;
    let reqObj = {rydeId: resO.rydeId};
    return fetch(this.baseUrl + email + '/handlePassengerNotificationOnPress', {
      method: "POST",
      headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
    }).then((response) => {
      if(response.status === 200) {
        let passengerNotifications = this.state.notifications;
        let updatedPassengerNotifications = passengerNotifications.splice(rydeIndex, 1);
        if(this._isMounted){ // pass trigger prop in object
          this.setState({notifications: updatedPassengerNotifications});
        }
        Actions.availableProfile({isPassenger, resO, myRes, driverFilledObj});
      } else {
        Toast.show({
          text: 'Server error',
          position: 'top',
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000
        });
      }
    },  (err) => {
      Toast.show({
        text: err,
        position: 'top',
        buttonText: 'Okay',
        type: 'danger',
        duration: 4000
      });
        });
  }


  handleDriverNotificationOnPress(resObjRyde, passengerObj, passengerIndex) {
    let resObjUser = this.props.resObj;
    let {isPassenger, driverFilledObj} = this.props;

    let {email} = this.props.resObj;
    let reqObj = {email: passengerObj.email};
    return fetch(this.baseUrl + email + '/handleDriverNotificationOnPress', {
      method: "POST",
      headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
    }).then((response) => {
      if(response.status === 200) {
        let driverNotifications = this.state.notifications;
        for (let i = 0; i < this.state.notifications.length; i++) {
          if(this.state.notifications[i].props.id === passengerIndex) {
            driverNotifications.splice(i, 1);
            break;
          }
        }
        // driverNotifications.splice(passengerIndex, 1);
        if(this._isMounted){
          this.setState({notifications: driverNotifications});
        }
        // let triggerObj = {triggerBool: true};
        Actions.requestedRides({isPassenger, resObjUser, resObjRyde, driverFilledObj});
      } else {
        Toast.show({
          text: 'Server error',
          position: 'top',
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000
        });
      }
    },  (err) => {
      Toast.show({
        text: err,
        position: 'top',
        buttonText: 'Okay',
        type: 'danger',
        duration: 4000
      });
        });
  }


  populatePassengerAcceptedRydes(resObjAcceptedRydes) {
    let passengerAcceptedRydes = [];
    let numSeen = resObjAcceptedRydes.unseenAcceptedRydes.length;
    this.props.badgeFunc(numSeen);

    for(let i=resObjAcceptedRydes.unseenAcceptedRydes.length-1; i>=0; i--){
      let resObjRyde = resObjAcceptedRydes.unseenAcceptedRydes[i];

      passengerAcceptedRydes.push(
        <View key={i}>
          <CardItem
            style={{marginBottom: 20, marginLeft: 10, marginRight: 10, backgroundColor: 'rgb(72, 110, 255)'}}
            button
            onPress={() => {this.handlePassengerNotificationOnPress(resObjRyde, i)}}>
            <Body>
              <Text style={{fontWeight: 'bold', fontStyle: 'italic', color: '#fff'}}>
                {resObjRyde.from} - {resObjRyde.to}
              </Text>
              <Text style={{color: '#fff'}}>Driver:   {resObjRyde.firstName} {resObjRyde.lastName}</Text>
              <Text style={{color: '#fff'}}>Date of trip:   {resObjRyde.date}</Text>
            </Body>
          </CardItem>
        </View>
      );
    }
    if(passengerAcceptedRydes.length < 1){
      passengerAcceptedRydes.push(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} key={0}>
          <Text style={{color: 'gray'}}>No notifications</Text>
        </View>
      )
      if(this._isMounted){
        this.setState({notifications: passengerAcceptedRydes});
      }
    } else {
      if(this._isMounted){
        this.setState({notifications: passengerAcceptedRydes});
      }
    }
  }


  populateDriverNotifications(resObjPending) {
    let driverPendingRequests = [];
    let numSeen = resObjPending.unseenPendingRequests.length;
    this.props.badgeFunc(numSeen);

    for(let i=resObjPending.unseenPendingRequests.length-1; i>=0; i--){
      let passengerObj = resObjPending.unseenPendingRequests[i].passenger;
      let resObjRyde = resObjPending.unseenPendingRequests[i].rydeObj;

      driverPendingRequests.push(
        <View key={i}>
          <CardItem
            style={{marginBottom: 20, marginLeft: 10, marginRight: 10, backgroundColor: 'rgb(72, 110, 255)'}}
            button
            onPress={() => {this.handleDriverNotificationOnPress(resObjRyde, passengerObj, i)}}>
            <Body>
              <Text style={{fontWeight: 'bold', fontStyle: 'italic', color: '#fff'}}>{resObjRyde.from} - {resObjRyde.to}</Text>
              <Text style={{color: '#fff'}}>Passenger:   {passengerObj.firstName} {passengerObj.lastName}</Text>
              <Text style={{color: '#fff'}}>Date of trip:   {resObjRyde.date}</Text>
            </Body>
          </CardItem>
        </View>
      );
    }
    if(driverPendingRequests.length < 1){
      driverPendingRequests.push(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} key={0}>
          <Text style={{color: 'gray'}}>No notifications</Text>
        </View>
      )
      if(this._isMounted){
        this.setState({notifications: driverPendingRequests});
      }
    } else {
      if(this._isMounted){
        this.setState({notifications: driverPendingRequests});
      }
    }

  }


  retrieveNotifications() {

    if(this.props.isPassenger !== undefined && this.props.resObj !== undefined) {
      let {isPassenger} = this.props;
      let {email} = this.props.resObj;

      if(isPassenger) {
        // fetch passenger's rydesAppliedToAsPassenger
        // populatedDiverPendingRequests(resObj);
        // retrievePassengerAcceptedRydes
        return fetch(this.baseUrl + email + '/retrievePassengerAcceptedRydes', {
          method: "GET"
        }).then((response) => {
          if(response.status === 200) {
            resObjPromise = response.json();

            resObjPromise.then((resObjAcceptedRydes) => {
              this.populatePassengerAcceptedRydes(resObjAcceptedRydes);
            }, (err) => {
              Toast.show({
                text: 'Second promise Error: ' + err,
                position: 'top',
                buttonText: 'Okay',
                type: 'danger',
                duration: 3000
              });
    				});
          } else {
            Toast.show({
              text: 'Server error',
              position: 'top',
              buttonText: 'Okay',
              type: 'danger',
              duration: 3000
            });
    			}
        },  (err) => {
          Toast.show({
            text: 'First promise Error: ' + err,
            position: 'top',
            buttonText: 'Okay',
            type: 'danger',
            duration: 3000
          });
        });
      } else {
        //fetch driver's pending requests
        return fetch(this.baseUrl + email + '/retrieveDriverPendingRequests', {
          method: "GET"
        }).then((response) => {
          if(response.status === 200) {
            resObjPromise = response.json();

            resObjPromise.then((resObjPending) => {
              this.populateDriverNotifications(resObjPending);
            }, (err) => {
              Toast.show({
                text: 'Second promise Error: ' + err,
                position: 'top',
                buttonText: 'Okay',
                type: 'danger',
                duration: 3000
              });
    				});
          } else {
            Toast.show({
              text: 'Server error',
              position: 'top',
              buttonText: 'Okay',
              type: 'danger',
              duration: 3000
            });
    			}
        },  (err) => {
          Toast.show({
            text: 'First promise Error: ' + err,
            position: 'top',
            buttonText: 'Okay',
            type: 'danger',
            duration: 3000
          });
        });
      }

    } else {
      alert('pass resObj props');
    }

  }


  render() {
    var navigationView = (
      <Container>
        <Header style={styles.navBar}>
          <View style={styles.navbarContainer}>
            <Text style={styles.navBarTitle}>Notifications</Text>
          </View>
        </Header>
        <View style={{paddingBottom: 20, backgroundColor: '#fff'}} />
        <ScrollView
          refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
          />}
          style={{backgroundColor: '#fff'}}>
          {this.state.notifications}
        </ScrollView>
      </Container>
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={(notifications) => (this.notifications = notifications)}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        drawerLockMode='locked-closed'
        renderNavigationView={() => navigationView}>
        {this.props.children}
      </DrawerLayoutAndroid>
    );

  }

}

module.exports = Notifications;

AppRegistry.registerComponent('Notifications', () => Notifications);
