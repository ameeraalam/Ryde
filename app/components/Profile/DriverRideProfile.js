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
export default class DriverRideProfile extends Component {

  //consist of values from the db. name of driver, luggae, spots, etc.
  //state {

  //}
  //need to add logic on when it should be disabled, etc.
=======
  StyleSheet,
  ScrollView
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Icon, CardItem, Body, Button, Title, Content, Footer, FooterTab} from 'native-base';

//this is the profile you link to when you click on a ride you have posted as a driver. make sure to pass both ride and passenger obj
class DriverRideProfile extends Component {

  constructor(props){
	super(props);
  this.address = "192.168.0.30";
  this.baseUrl = "http://" + this.address + ":3000/";

	}
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
            <Icon name='menu'/>
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
          </Button>
        </Left>
        <Left>
          <Button transparent>
<<<<<<< HEAD
              <Icon name='bell-o' color='white' size={24} />
=======
              <Icon name='notifications'/>
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
      <View>
      <Button large info style={styles.button}><Text style={styles.text}>View Requests</Text></Button>
      <Button info style={styles.starttrip}><Text style={styles.text}>Start Trip</Text></Button>
      <Button disabled style={styles.endtrip}><Text style={styles.text}>End Trip</Text></Button>
      <Button large info style={styles.chat}><Text style={styles.text}>Chat</Text></Button>
      </View>
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
      <View style={styles.container}>
      <Button large info><Text style={styles.text}>View Requests</Text>
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
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
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
<<<<<<< HEAD
     }
=======
     },
     container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
});
module.exports = DriverRideProfile;

AppRegistry.registerComponent('DriverRideProfile', () => DriverRideProfile);
