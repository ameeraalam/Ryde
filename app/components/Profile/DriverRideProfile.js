import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Icon, CardItem, Card, Body, Button, Title, Content, Footer, FooterTab, Toast} from 'native-base';
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
      showToast: false,
      loading: false,
      starRating: []
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

  rating(){
    let total = this.props.resObjDriver.totalRating;
    let num = this.props.resObjDriver.numRating;
    let rating = Math.round(total/num);

    let imgstar = require('./Images/star_filled.png')
    let imgblank = require('./Images/star_unfilled.png')

    let stars = [];

    if(num === 0){
      for(let i=0;i<5;i++){
        stars.push(<Image style={{height: 30, width: 30}} key ={i} source={imgblank} />);
      }
    }

    else{
      for(let i=0;i<rating;i++){
        stars.push(<Image style={{height: 30, width: 30}} key ={i} source={imgstar} />);
      }
    }

    this.setState({starRating: stars});
  }

  componentWillMount(){
    this.rating();
  }

  deletePost() {
    reqObj = {
      driver: this.props.resObjDriver,
      ryde: this.props.resObjRide
    }
    this.setState({loading: true});

    // this is when we press the end trip button
    fetch(this.baseUrl + "endTrip", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqObj)
    }).then((res) => {
      this.setState({loading: false});

      if (res.status === 200) {
        // if success we view the ratings page
        let resObjUser = this.props.resObjDriver;
        let resObjRyde = this.props.resObjRide;
        Actions.passengerRatings({resObjUser, resObjRyde});
      } else {

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
    });

  }

  rateButton(){
    let resObjUser = this.props.resObjDriver;
    let resObjRyde = this.props.resObjRide;
    Actions.passengerRatings({resObjUser, resObjRyde});
  }

  bruteForceDeletePost(){
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

        Toast.show({
                  text: 'Post has been deleted',
                  position: 'top',
                  buttonText: 'Okay',
                  duration: 3000
                });

        let resObj = this.props.resObjDriver;

        Actions.pop();
        Actions.refresh({resObj});
      } else {

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
            <Header style={{backgroundColor: 'rgb(0, 51, 153)'}}>
              <Left style={{flex: 1}}>
                <Button transparent onPress={this.openMenu}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body style={{alignItems: 'center', flex: 1}}>
                <Title style={{fontFamily: 'sans-serif'}}>Ride Details</Title>
              </Body>
              <Right style={{flex: 1}}>
                <Button onPress = {() => {this.openNotifications()}} transparent>
                  <Icon name='notifications' />
                </Button>
              </Right>
            </Header>
            <Content style={{backgroundColor:'white'}}>
              <View style={{backgroundColor: 'rgb(0, 51, 153)'}}>
              <Icon name='person' style={{marginTop: 40, marginLeft: 30, color: 'white'}}><Text> {this.props.resObjDriver.firstName} {this.props.resObjDriver.lastName} </Text></Icon>

                <Icon name='mail' style={{fontSize: 20, marginLeft: 30, color: 'white'}}>
                  <Text> {this.props.resObjRide.driver}</Text>
                </Icon>

                {/*will need to figure out the rating stars*/}


                <View style={{marginLeft: 30, marginBottom: '1%', flexDirection: 'row'}}>{this.state.starRating}</View>

                <View style={{flexDirection: 'row'}}>

                <Icon name='person-add' style={{color:'white', marginLeft: '60%', marginBottom: '3%'}} onPress = {() => {
                    //Actions.pop();
                    Actions.requestedRides({resObjUser, resObjRyde});
                  }} />


                <Icon name='chatbubbles' style={{color: 'white', marginLeft: '7%', marginBottom: '3%'}} onPress={ () => {Actions.chat({resObjUser, resObjRyde})}}/>

                <Icon name = 'trash' style={{color: 'white', marginLeft: '7%', marginBottom: '3%'}} onPress={ () => {
                  // Prompt the user if he actually wants to delete the post

                  Alert.alert(
                    "Are you sure you want to delete this ride?",
                    "",
                    [
                      {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                      {text: 'OK', onPress: () => {
                        this.bruteForceDeletePost();
                      }},
                    ],
                    { cancelable: false }
                  )
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
                  <Icon name ='people' style={{fontSize: 16}} onPress = {() => {
                      Actions.viewMembers({resObjUser, resObjRyde});}}><Text onPress = {() => {
                          Actions.viewMembers({resObjUser, resObjRyde});}}> MEMBERS </Text> </Icon><Icon name='arrow-dropright' style={{fontSize: 16}} onPress = {() => {
                      Actions.viewMembers({resObjUser, resObjRyde});}} />
                  </Left>
                  <Right>
                  <Text style={{color:'black'}}>{this.props.resObjRide.members.length}</Text>
                  </Right>
                  </CardItem>
                  </Card>
                  </View>

              </Content>

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
  mainStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',

	},
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
