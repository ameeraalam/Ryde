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
import {Container, Header, Left, Right, Icon, CardItem, Body, Button, Title, Content, Footer, FooterTab} from 'native-base';

import config from "./../../config";

//this is the profile you link to when you click on a ride you have posted as a driver. make sure to pass both ride and passenger obj
class DriverRideProfile extends Component {


  constructor(props){
    super(props);
    this.address = config.ip;
    this.baseUrl = "http://" + this.address + ":3000/";
	}

  render() {

    let resObjDriver = this.props.resObjDriver;
    let resObjRide = this.props.resObjRide;

    return (
      <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu'/>
          </Button>
        </Left>
        <Left>
          <Button transparent>
              <Icon name='notifications'/>
          </Button>
        </Left>
        <Body>
          <Title>RYDE INFO</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='search' />
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
          Actions.requestedRides({resObjDriver, resObjRide});
      }}><Text style={styles.text}>View Requests</Text>
      </Button><Button large info><Text style={styles.text}>Chat</Text></Button>
      </View>
      </Content>
      </ScrollView>
      <Footer>
        <FooterTab>
        <Button success><Text style={styles.text}>Start Trip</Text></Button>
        <Button disabled><Text style={styles.text}>End Trip</Text></Button>
        </FooterTab>
      </Footer>
</Container>
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
