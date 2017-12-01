import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  BackHandler
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Left, Right, Icon, CardItem, Body, Button, Title, Content, Footer, FooterTab, Badge, Toast } from 'native-base';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";

//this is the profile you link to when you click on a ride you have posted as a driver. make sure to pass both ride and passenger obj
class DriverRideProfile extends Component {


  constructor(props){
    super(props);
    this.baseUrl = config();
    this.openMenu = this.openMenu.bind(this);
    this.openNotifications = this.openNotifications.bind(this);
    this.setBadge = this.setBadge.bind(this);
    this.startTrip = this.startTrip.bind(this);
    this.endTrip = this.endTrip.bind(this);
    this.state = {
			placeBadge: false,
      showToast: false
		}
  }

  openNotifications(){
    this.notifications.openDrawer();
  }

  openMenu() {
    this.drawer.openDrawer();
  }


  componentDidMount() {
		this._isMounted = true;
		console.log('componentDidMount in driverRideProfile');
	}

	componentWillUnmount() {
		this._isMounted = false;
	}


  setBadge(num) {
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


  startTrip() {
    let reqObj = {
      from: this.props.resObjRide.from,
      to: this.props.resObjRide.to,
      rydeId: this.props.resObjRide.rydeId
    }
    let {email} = this.props.resObjDriver;
    return fetch(this.baseUrl + email + '/startTrip', {
      method: "POST",
      headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
    }).then((response) => {
      if(response.status === 200) {
        Toast.show({
          text: `You've just started your trip from ${reqObj.from} to ${reqObj.to}`,
          position: 'top',
          buttonText: 'Okay',
          duration: 4000
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


  endTrip() {
    let reqObj = {
      firstName: this.props.resObjDriver.firstName,
      rydeId: this.props.resObjRide.rydeId
    }
    let {email} = this.props.resObjDriver;
    return fetch(this.baseUrl + email + '/endTrip', {
      method: "POST",
      headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
      body: JSON.stringify(reqObj)
    }).then((response) => {
      if(response.status === 200) {
        Toast.show({
          text: `Thanks for hosting this ryde ${reqObj.firstName}, Please rate your trip`,
          position: 'top',
          buttonText: 'Okay',
          duration: 4000
        });
        // Actions.ratingsPage({pass object});
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


  render() {

    let resObjUser = this.props.resObjDriver;
    let resObjRyde = this.props.resObjRide;
    let {isPassenger, driverFilledObj} = this.props;
    let displayBadge = (<Badge style={{ position: 'absolute', right: 14, top: 9, paddingTop: 0,
      paddingBottom: 0, borderRadius: 100, height: 11, zIndex: 1 }}/>);

    return (
      <Notifications
        badgeFunc = {this.setBadge}
        isPassenger={false}
        resObj = {this.props.resObjDriver}
        driverFilledObj = {this.props.driverFilledObj}
        ref={(notifications) => (this.notifications = notifications)}>
        <Drawer
          isPassenger={false}
					resObj = {this.props.resObjDriver}
					driverFilledObj = {this.props.driverFilledObj}
          ref={(drawer) => this.drawer = drawer}>
          <Container>
            <Header style={{backgroundColor: 'rgb(72, 110, 255)'}}>
              <Left style={{flex: 1}}>
                <Button transparent onPress={this.openMenu}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body style={{alignItems: 'center', flex: 1}}>
                <Title style={{fontFamily: 'sans-serif'}}>RYDE INFO</Title>
              </Body>
              <Right style={{flex: 1}}>
                <Button badge onPress = {() => {this.openNotifications()}} transparent>
                  {this.state.placeBadge && displayBadge}
                  <Icon name='notifications' />
                </Button>
              </Right>
            </Header>
            <ScrollView>
              <Content>
                <Image
                  style={{
                    width: 160,
                    borderRadius: 80,
                    height: 160,
                    alignItems: 'center'
                  }}
                  source={require('../Profile/Images/profilepic.jpg')}
                  />

                <CardItem>
                  <Text>Driver E-mail: {this.props.resObjRide.driver}</Text>
                </CardItem>
                <Text></Text>
                <CardItem>
                  <Text>Rating: {this.props.resObjRide.rating}</Text>
                </CardItem>
                <Text></Text>
                <CardItem>
                  <Text>Luggage: {this.props.resObjRide.numLuggage} </Text>
                </CardItem>
                <Text></Text>
                <CardItem>
                  <Text>Passengers: {this.props.resObjRide.numPassengers}</Text>
                </CardItem>
                <Text></Text>
                <CardItem>
                  <Text>Price: {this.props.resObjRide.price}</Text>
                </CardItem>
                <Text></Text>
                <CardItem>
                  <Text>From: {this.props.resObjRide.from}</Text>
                </CardItem>
                <Text></Text>
                <CardItem>
                  <Text>To: {this.props.resObjRide.to}</Text>
                </CardItem>
                <Text></Text>
                <View style={styles.container}>
                  <Button large info onPress = {() => {
                      Actions.requestedRides({isPassenger, resObjUser, resObjRyde, driverFilledObj});
                    }}><Text style={styles.text}>View Requests</Text>
                </Button>
                <Button large info onPress={ () => {Actions.chat({isPassenger, resObjUser, resObjRyde, driverFilledObj})}}>
                  <Text style={styles.text}>Chat</Text>

                </Button>
                </View>
              </Content>
            </ScrollView>
            <Footer>
              <FooterTab>
                <Button onPress={this.startTrip} success><Text style={styles.text}>Start Trip</Text></Button>
                <Button onPress={this.endTrip}><Text style={styles.text}>End Trip</Text></Button>
              </FooterTab>
            </Footer>
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
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom:16
  },

  button: {
    position: 'absolute',
    bottom:20,
    right:15,
  },

  starttrip: {
    position: 'absolute',
    bottom: 80,
    left: 30
  },

  endtrip: {
    position: 'absolute',
    bottom: 20,
    left: 30
  },

  chat: {
    position: 'absolute',
    bottom: 20,
    right: 170
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
module.exports = DriverRideProfile;

AppRegistry.registerComponent('DriverRideProfile', () => DriverRideProfile);
