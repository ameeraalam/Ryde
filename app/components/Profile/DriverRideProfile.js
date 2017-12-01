import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
<<<<<<< HEAD
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Icon, CardItem, Card, Body, Button, Title, Content, Footer, FooterTab, Toast} from 'native-base';
=======
  Alert
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Icon, CardItem, Body, Button, Title, Content, Footer, FooterTab} from 'native-base';
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
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
<<<<<<< HEAD
      showToast: false,
      loading: false
=======
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
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
<<<<<<< HEAD
    this.setState({loading: true});
=======
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a

    // this is when we press the end trip button
    fetch(this.baseUrl + "endTrip", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqObj)
    }).then((res) => {
<<<<<<< HEAD
      this.setState({loading: false});

=======
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
      if (res.status === 200) {
        // if success we view the ratings page
        let resObjUser = this.props.resObjDriver;
        let resObjRyde = this.props.resObjRide;
        Actions.passengerRatings({resObjUser, resObjRyde});
      } else {
<<<<<<< HEAD

        Toast.show({
									text: 'Server sent an error',
									position: 'top',
									buttonText: 'Okay',
									duration: 3000
								});
      }
    }, (err) => {
      Toast.show({
				text: 'Promise Error:\nUnhandled promise',
				position: 'top',
				buttonText: 'Okay',
				duration: 3000
			});
=======
        alert("Server sent an error");
      }
    }, (err) => {
      alert(err)
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
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
<<<<<<< HEAD
          <ScrollView>
          <Container>
            <Header style={{backgroundColor: 'rgb(0, 51, 153)'}}>
=======
          <Container>
            <Header style={{backgroundColor: 'rgb(72, 110, 255)'}}>
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
              <Left style={{flex: 1}}>
                <Button transparent onPress={this.openMenu}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body style={{alignItems: 'center', flex: 1}}>
<<<<<<< HEAD
                <Title style={{fontFamily: 'sans-serif'}}>Ride Details</Title>
=======
                <Title style={{fontFamily: 'sans-serif'}}>RYDE INFO</Title>
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
              </Body>
              <Right style={{flex: 1}}>
                <Button onPress = {() => {this.openNotifications()}} transparent>
                  <Icon name='notifications' />
                </Button>
              </Right>
            </Header>
<<<<<<< HEAD
            <ScrollView style={{backgroundColor:'white'}}>
              <Content>
              <View style={{backgroundColor: 'rgb(0, 51, 153)'}}>
              <Icon name='person' style={{marginTop: 40, marginLeft: 30, color: 'white'}}><Text> {this.props.resObjDriver.firstName} {this.props.resObjDriver.lastName} </Text></Icon>
                <Icon name='mail' style={{fontSize: 20, marginLeft: 30, color: 'white'}}>
                  <Text> {this.props.resObjRide.driver}</Text>
                </Icon>
                {/*will need to figure out the rating stars*/}
                <View style={{flexDirection: 'row'}}>
                <Icon name='star-half' style={{fontSize: 20, marginLeft: 30, color: 'white', marginBottom: 20}}>
                  <Text> {this.props.resObjRide.rating}</Text>
                </Icon>
                <Icon name='person-add' style={{color:'white', marginLeft: '50%'}} onPress = {() => {
                    Actions.requestedRides({resObjUser, resObjRyde});
                  }} />
                <Icon name='chatbubbles' style={{color: 'white', marginLeft: '7%'}} onPress={ () => {Actions.chat({resObjUser, resObjRyde})}}/>

                <Icon name = 'trash' style={{color: 'white', marginLeft: '7%'}} onPress={ () => {
=======
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
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
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
<<<<<<< HEAD
                }}/>
                </View>
                </View>
                <View>
                <Card  style={{marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20}}>

                <CardItem>
                  <Left>
                  <Icon name ='pin' style={{fontSize: 16}}><Text> FROM </Text></Icon>
                  </Left>
                  <Right>
                  <Text style={{color:'black'}}>{this.props.resObjRide.from}</Text>
                  </Right>
                  </CardItem>

                  <CardItem>
                  <Left>
                  <Icon name ='pin' style={{fontSize: 16}}><Text> TO </Text> </Icon>
                  </Left>
                  <Right>
                    <Text style={{color:'black'}}>{this.props.resObjRide.to}</Text>
                  </Right>
                  </CardItem>

                  <CardItem>
                  <Left>
                  <Icon name ='calendar' style={{fontSize: 16}}><Text> DATE </Text> </Icon>
                  </Left>
                  <Right>
                    <Text style={{color:'black'}}>{this.props.resObjRide.date}</Text>
                  </Right>
                  </CardItem>

                  <CardItem>
                  <Left>
                  <Icon name ='briefcase' style={{fontSize: 16}}><Text> LUGGAGE SPACE </Text> </Icon>
                  </Left>
                  <Right>
                  <Text style={{color:'black'}}>{this.props.resObjRide.numLuggage}</Text>
                  </Right>
                  </CardItem>

                  <CardItem>
                  <Left>
                  <Icon name ='contacts' style={{fontSize: 16}}><Text> NO. PASSENGER </Text> </Icon>
                  </Left>
                  <Right>
                  <Text style={{color:'black'}}>{this.props.resObjRide.numPassengers}</Text>
                  </Right>
                  </CardItem>

                  <CardItem>
                  <Left>
                  <Icon name ='cash' style={{fontSize: 16}}><Text> PRICE </Text> </Icon>
                  </Left>
                  <Right>
                  <Text style={{color:'black'}}>{this.props.resObjRide.price}</Text>
                  </Right>
                  </CardItem>

                  <CardItem>
                  <Left>
                  <Icon name ='people' style={{fontSize: 16}}><Text> MEMBERS </Text> </Icon><Icon name='arrow-dropdown' style={{fontSize: 16}} onPress = {() => {
                      Actions.viewMembers({resObjUser, resObjRyde});}} />
                  </Left>
                  <Right>
                  <Text style={{color:'black'}}>{this.props.resObjRide.members.length}</Text>
                  </Right>
                  </CardItem>
                  </Card>
                  </View>
=======
                }}>
                  <Text style={styles.text}>Delete Post</Text>
                </Button>

                </View>
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
              </Content>
            </ScrollView>
            <Footer>
              <FooterTab>
<<<<<<< HEAD
              <Button success = {this.state.green} failure = {this.state.red} onPress = {() => {
                this.endTrip();
              }}><Text style={styles.text}>{this.state.buttonMessage}</Text></Button>
              </FooterTab>
            </Footer>
          </Container>
        </ScrollView>
=======
                <Button success = {this.state.green} failure = {this.state.red} onPress = {() => {
                  this.endTrip();
                }}><Text style={styles.text}>{this.state.buttonMessage}</Text></Button>
              </FooterTab>
            </Footer>
          </Container>
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
        </Drawer>
      </Notifications>

    );
  }
}
const styles = StyleSheet.create({
<<<<<<< HEAD
  mainStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',

	},
=======
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
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
  },

  bottomItem: {
    width: '50%',
    height: '50%',
    padding: 5,
    backgroundColor: 'rgb(83,183,237)',
    flex: 1
  },

  buttontwo: {
		backgroundColor:'rgb(0, 51, 153)',
		textAlign:'center',
		height:54,
		color:'#fff',
		fontSize:18,
		paddingTop:14,
		fontFamily: 'sans-serif',
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
    marginBottom: 10
	},
});
module.exports = DriverRideProfile;

AppRegistry.registerComponent('DriverRideProfile', () => DriverRideProfile);
