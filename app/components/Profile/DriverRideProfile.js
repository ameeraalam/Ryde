import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Icon, CardItem, Body, Button, Title, Content, Footer, FooterTab} from 'native-base';
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
    this.state = {
      trip: true,
      buttonMessage: "Start Trip",
      red: false,
      green: true,
    }
  }

  openNotifications(){
    this.notifications.openDrawer();
  }

  openMenu() {
    this.drawer.openDrawer();
  }

  endTrip() {
    if (this.state.trip === true) {
      this.setState({trip: !this.state.trip, buttonMessage: "End Trip", red: true, green: false});
    } else {

        // THIS IS WHERE EVERYTHING HAPPENS, PUSH NOTIFICATION NEEDS TO BE SENT HERE



      this.deletePost();
    }
  }

  deletePost() {
    reqObj = {
      driver: this.props.resObjDriver,
      ryde: this.props.resObjRide
    }

    // this is when we press the end trip button
    fetch(this.baseUrl + "endTrip", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqObj)
    }).then((res) => {
      if (res.status === 200) {
        // if success we view the ratings page
        let resObjUser = this.props.resObjDriver;
        let resObjRyde = this.props.resObjRide;
        Actions.passengerRatings({resObjUser, resObjRyde});
      } else {
        alert("Server sent an error");
      }
    }, (err) => {
      alert(err)
    });

  }


  render() {

    let resObjUser = this.props.resObjDriver;
    let resObjRyde = this.props.resObjRide;

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
                  <Button small info onPress = {() => {
                      Actions.requestedRides({resObjUser, resObjRyde});
                    }}><Text style={styles.text}>View Requests</Text>
                  </Button>
                  <Button small info onPress = {() => {
                      Actions.viewMembers({resObjUser, resObjRyde});
                    }}><Text style={styles.text}>View Members</Text>
                  </Button>
                <Button small info onPress={ () => {Actions.chat({resObjUser, resObjRyde})}}>
                  <Text style={styles.text}>Chat</Text>
                </Button>
                <Button small info onPress={ () => {
                  // Prompt the user if he actually wants to delete the post

                  Alert.alert(
                    "Are you sure you want to delete this ride?",
                    "",
                    [
                      {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                      {text: 'OK', onPress: () => {
                        this.deletePost();
                      }},
                    ],
                    { cancelable: false }
                  )
                }}>
                  <Text style={styles.text}>Delete Post</Text>
                </Button>

                </View>
              </Content>
            </ScrollView>
            <Footer>
              <FooterTab>
                <Button success = {this.state.green} failure = {this.state.red} onPress = {() => {
                  this.endTrip();
                }}><Text style={styles.text}>{this.state.buttonMessage}</Text></Button>
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
