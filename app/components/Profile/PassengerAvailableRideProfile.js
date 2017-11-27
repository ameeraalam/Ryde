import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Icon, Right, Body, Button, Title, Content, Footer, CardItem} from 'native-base';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';

//this is the page you will link to when you click on a ride you have been accepted in to as a passenger. make sure to send both ride obj and passenger obj
class PassengerAvailableRideProfile extends Component {
  constructor(props){
    super(props);
    this.openMenu = this.openMenu.bind(this);
    this.openNotifications = this.openNotifications.bind(this);
  }

  openNotifications(){
    this.notifications.openDrawer();
  }

  openMenu() {
    this.drawer.openDrawer();
  }

  render() {
    return (
      <Notifications
        ref={(notifications) => (this.notifications = notifications)}>
        <Drawer
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
                <Button onPress = {() => {this.openNotifications()}} transparent>
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
                  <Text>Luggage: {this.props.resO.luggage} </Text>
                </CardItem>
                <Text></Text>
                <CardItem>
                  <Text>Passengers: {this.props.resO.passengers}</Text>
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
            <View>
              <Button large info style={styles.viewmap}><Text style={styles.text}>View Map</Text></Button>
              <Button large info style={styles.chat} onPress={ () => {
                    let resObjRyde = this.props.resO;
                    let resObjUser = this.props.myRes;
                    Actions.chat({resObjUser, resObjRyde})}
                }>
                <Text style={styles.text}>Chat</Text>
              </Button>
              <Button large info  onPress={ () => {




                    // THIS NEEDS TO BE REMOVED LATER


                    // THE DRIVER PAGE ONLY NEEDS THE RYDEOBJECT TO FUNCTION


                    let resObjRyde = this.props.resO;
                    let resObjUser = this.props.myRes;
                    Actions.driverRatings({resObjUser, resObjRyde})}
                }>
                <Text >Rate Driver</Text>
              </Button>
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
module.exports = PassengerAvailableRideProfile;

AppRegistry.registerComponent('PassengerAvailableRideProfile', () => PassengerAvailableRideProfile);
