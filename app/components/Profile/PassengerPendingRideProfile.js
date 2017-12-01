import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Left, Icon, Right, Body, Button, Title, Content, Footer, CardItem, Badge } from 'native-base';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';

//this is the page you link to when you click on a ride you have requested to join as a passenger. make sure to send both the ride and passenger obj.
class PassengerPendingRideProfile extends Component {
  constructor(props){
    super(props);
    this.openMenu = this.openMenu.bind(this);
    this.openNotifications = this.openNotifications.bind(this);
    this.setBadge = this.setBadge.bind(this);
    this.state = {
      placeBadge: false
    }
  }


  componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}


  openNotifications(){
    this.notifications.openDrawer();
  }

  openMenu() {
    this.drawer.openDrawer();
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


  render() {
    let displayBadge = (<Badge style={{ position: 'absolute', right: 14, top: 9, paddingTop: 0,
      paddingBottom: 0, borderRadius: 100, height: 11, zIndex: 1 }}/>)

    return (
      <Notifications
        badgeFunc = {this.setBadge}
        isPassenger={true}
        resObj = {this.props.myRes}
        driverFilledObj = {this.props.driverFilledObj}
        ref={(notifications) => (this.notifications = notifications)}>
        <Drawer
          isPassenger={true}
          resObj = {this.props.myRes}
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
                  <Text>Driver E-mail: {this.props.resO.driver}</Text>
                </CardItem>

                <Text></Text>

                <CardItem>
                  <Text>Rating: {this.props.resO.rating}</Text>
                </CardItem>

                <Text></Text>

                <CardItem>
                  <Text>Luggage: {this.props.resO.numLuggage} </Text>
                </CardItem>

                <Text></Text>

                <CardItem>
                  <Text>Passengers: {this.props.resO.numPassengers}</Text>
                </CardItem>

                <Text></Text>

                <CardItem>
                  <Text>Price: {this.props.resO.price}</Text>
                </CardItem>

                <Text></Text>

                <CardItem>
                  <Text>From: {this.props.resO.from}</Text>
                </CardItem>

                <Text></Text>

                <CardItem>
                  <Text>To: {this.props.resO.to}</Text>
                </CardItem>

                <Text></Text>

              </Content>
            </ScrollView>
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

  viewmap: {
    position: 'absolute',
    bottom: 20,
    left: 15
  },

  chat: {
    position: 'absolute',
    bottom: 20,
    right: 170
  }
});
module.exports = PassengerPendingRideProfile;

AppRegistry.registerComponent('PassengerPendingRideProfile', () => PassengerPendingRideProfile);
