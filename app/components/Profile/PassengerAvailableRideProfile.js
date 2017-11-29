import React, { Component } from 'react';
<<<<<<< HEAD
import Icon from 'react-native-vector-icons/FontAwesome';
=======
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
import {
  AppRegistry,
  Text,
  View,
  Image,
<<<<<<< HEAD
  StyleSheet
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Body, Button, Title, Content, Footer} from 'native-base';

//will most probably fill out profile details according to db
export default class PassengerAvailableRideProfile extends Component {

  //consist of values from the db. name of driver, luggae, spots, etc.
  //state {

  //}
  //need to add logic on when it should be disabled, etc.
=======
  StyleSheet,
  ScrollView
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Icon, Right, Body, Button, Title, Content, Footer, CardItem} from 'native-base';

//this is the page you will link to when you click on a ride you have been accepted in to as a passenger. make sure to send both ride obj and passenger obj
class PassengerAvailableRideProfile extends Component {
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46

  render() {
    return (
      <Container>
      <Header>
        <Left>
          <Button transparent>
<<<<<<< HEAD
            <Icon name='bars' color='white' size={24} />
=======
            <Icon name='menu'  />
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
          </Button>
        </Left>
        <Left>
          <Button transparent>
<<<<<<< HEAD
              <Icon name='bell-o' color='white' size={24} />
=======
              <Icon name='notifications' />
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
          </Button>
        </Left>
        <Body>
          <Title>RYDE INFO</Title>
        </Body>
        <Right>
          <Button transparent>
<<<<<<< HEAD
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
=======
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
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
      <View>
      <Button large disabled style={styles.button}><Text style={styles.text}>Request</Text></Button>
      <Button large info style={styles.viewmap}><Text style={styles.text}>View Map</Text></Button>
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
