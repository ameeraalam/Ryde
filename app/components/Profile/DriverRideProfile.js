import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Body, Button, Title, Content, Footer} from 'native-base';

//will most probably fill out profile details according to db
export default class DriverRideProfile extends Component {

  //consist of values from the db. name of driver, luggae, spots, etc.
  //state {

  //}
  //need to add logic on when it should be disabled, etc.
  constructor(props){
	super(props);
	//change ip address
	this.address = "192.168.2.76";
	this.baseUrl = "http://" + this.address + ":3000/";
	this.state = {
    firstName: "First name",
    lastName: "Last name",
		fromLocation: "From",
		toLocation: "To",
		travelDate: "Date",
		numPassengers: "Passenger Spots",
		numLuggage: "Luggage Space"
		}
	}

  render() {
    return (
      <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='bars' color='white' size={24} />
          </Button>
        </Left>
        <Left>
          <Button transparent>
              <Icon name='bell-o' color='white' size={24} />
          </Button>
        </Left>
        <Body>
          <Title>RYDE INFO</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='search' color='white' size={24} />
          </Button>
        </Right>
      </Header>
      <Content>
      <Image
        style={{
          flex: 1,
          width: 160,
          height: 160,
          justifyContent: 'center',
                alignItems: 'center',
                }}
        source={require('../Profile/Images/profilepic.png')}
      />
      <Text>Driver Name</Text>
      <Text>Rating</Text>
      <Text>Luggage</Text>
      <Text>Passengers</Text>
      <Text>Price</Text>
      <Text>From</Text>
      <Text>To</Text>

      </Content>
      <View>
      <Button large info style={styles.button}><Text style={styles.text}>View Requests</Text></Button>
      <Button info style={styles.starttrip}><Text style={styles.text}>Start Trip</Text></Button>
      <Button disabled style={styles.endtrip}><Text style={styles.text}>End Trip</Text></Button>
      <Button large info style={styles.chat}><Text style={styles.text}>Chat</Text></Button>
      </View>
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
     }
});
module.exports = DriverRideProfile;

AppRegistry.registerComponent('DriverRideProfile', () => DriverRideProfile);
