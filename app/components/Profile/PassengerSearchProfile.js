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
import {Container, Header, Left, Right, Body, Button, Title, Content, Footer, Icon, CardItem} from 'native-base';

//page you will link to when you search for rides as a passenger and click on a ride you are interested in. make sure to send both the ride and passenger obj.
class PassengerSearchProfile extends Component {
  constructor(props){
    super(props);
    this.address = "192.168.0.30";
		this.baseUrl = "http://" + this.address + ":3000/";
  	}

  requestButton(){
    let reqObj = {

      myRes: this.props.myRes,
      driverRes: this.props.resO
    }

    fetch(this.baseUrl + "passengerSearch", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {
			if (res.status === 200) {
        //if request is succesfully sent then we alert the user
				alert("Request succesfully sent.")

			} else {
				alert("Error");
			}
		}, (err) => {
			if (err) {
				alert(err);
			}
		});
  }

  render() {
    return (
      <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu'  />
          </Button>
        </Left>
        <Left>
          <Button transparent>
              <Icon name='notifications' />
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
      <Button large style={styles.button}><Text style={styles.text} onPress={() => this.requestButton()}>Request</Text></Button>
      <Button large info style={styles.viewmap}><Text style={styles.text}>View Map</Text></Button>
      <Button large disabled info style={styles.chat}><Text style={styles.text}>Chat</Text></Button>
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
module.exports = PassengerSearchProfile;

AppRegistry.registerComponent('PassengerSearchProfile', () => PassengerSearchProfile);
