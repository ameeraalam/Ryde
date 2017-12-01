import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Icon, Right, Body, Button, Title, Content, Footer, CardItem, Card, Toast} from 'native-base';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';

import config from "./../../config";


//this is the page you will link to when you click on a ride you have been accepted in to as a passenger. make sure to send both ride obj and passenger obj
class PassengerAvailableRideProfile extends Component {
  constructor(props){
    super(props);
    this.baseUrl = config();
    this.openMenu = this.openMenu.bind(this);
    this.openNotifications = this.openNotifications.bind(this);
    this.state= {
      showToast: false,
      starRating: [],
      driverData: {
        firstName: "",
        lastName: "",
        totalRating: "",
        numRating: ""
      }
    }

  }

  openNotifications(){
    this.notifications.openDrawer();
  }

  openMenu() {
    this.drawer.openDrawer();
  }

  getDriverData(){
    fetch(this.baseUrl + this.props.resO.driver + "/getDriverData", {method: "GET"}).then((res) => {
      if(res.status === 200){

      let resPromise = res.json();

      resPromise.then((resObj) => {
        // do what you want with the resObj returned
        // from server

        this.setState({driverData: resObj}, () => {
            this.ratings();
        });


      })
    }

    else {
      Toast.show({
				text: 'Rating error',
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

  componentWillMount(){
    this.getDriverData();
  }

  ratings(){

    let totalRating = this.state.driverData.totalRating;
    let numRating = this.state.driverData.numRating;
    let rate = Math.round(totalRating/numRating);

    let imgstar = require('./Images/star_filled.png')
    let imgblank = require('./Images/star_unfilled.png')

    let stars = []

    if(numRating === 0){
      alert('here');
      for(let i=0;i<5;i++){
        stars.push(<Image style={{height: 30, width: 30}} key ={i} source={imgblank} />);
      }
    }

    else{
      for(let i=0;i<rate;i++){
        stars.push(<Image style={{height: 30, width: 30}} key ={i} source={imgstar} />);
      }
    }

    this.setState({starRating: stars});

  }

  render() {

    return (
      <Notifications
        ref={(notifications) => (this.notifications = notifications)}>
        <Drawer
          ref={(drawer) => this.drawer = drawer}>
          <Container style={{backgroundColor:'white'}}>
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
              <Content>


                <View style={{backgroundColor: 'rgb(0, 51, 153)'}}>

                  <Icon name ='person' style={{marginTop: 40, marginLeft: 30, color: 'white'}}><Text>{this.state.driverData.firstName} {this.state.driverData.lastName}</Text></Icon>

                  <Icon name ='mail' style={{fontSize: 20, marginLeft: 30, color: 'white', marginBottom: 20}}><Text>{this.props.resO.driver}</Text></Icon>



                    <View style={{marginLeft: 30, marginBottom: '1%', flexDirection: 'row'}}>{this.state.starRating}</View>

                    <View style={{flexDirection: 'row'}}>


                    <Icon name='chatbubbles' style={{color: 'white', marginLeft: '80%', marginBottom: '3%'}} onPress={ () => {
                          let resObjRyde = this.props.resO;
                          let resObjUser = this.props.myRes;
                          Actions.chat({resObjUser, resObjRyde})}
                      }/>



                  </View>
                </View>

                <View>
                  <Card style={{marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20}}>

                  <CardItem>
                    <Left>
                      <Icon name ='pin' style={{fontSize: 16}}><Text> FROM </Text></Icon>
                    </Left>
                    <Right>
                      <Text style={{color:'black'}}>{this.props.resO.from}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Left>
                      <Icon name ='pin' style={{fontSize: 16}}><Text> TO </Text> </Icon>
                    </Left>
                    <Right>
                      <Text style={{color:'black'}}>{this.props.resO.to}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Left>
                      <Icon name ='calendar' style={{fontSize: 16}}><Text> DATE </Text> </Icon>
                    </Left>
                    <Right>
                      <Text style={{color:'black'}}>{this.props.resO.date}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Left>
                      <Icon name ='briefcase' style={{fontSize: 16}}><Text> LUGGAGE SPACE </Text> </Icon>
                    </Left>
                    <Right>
                    <Text style={{color:'black'}}>{this.props.resO.numLuggage}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Left>
                      <Icon name ='contacts' style={{fontSize: 16}}><Text> NO. PASSENGER </Text> </Icon>
                    </Left>
                    <Right>
                      <Text style={{color:'black'}}>{this.props.resO.numPassengers}</Text>
                    </Right>
                  </CardItem>
                </Card>
              </View>
            </Content>
            {/*<View style = {{marginTop: 15, marginBottom: 30, paddingLeft: 15, paddingRight: 15}}>

              <TouchableOpacity onPress={ () => {




                    // THIS NEEDS TO BE REMOVED LATER


                    // THE DRIVER PAGE ONLY NEEDS THE RYDEOBJECT TO FUNCTION


                    let resObjRyde = this.props.resO;
                    let resObjUser = this.props.myRes;
                    Actions.driverRatings({resObjUser, resObjRyde})}
                }><Text style = {{backgroundColor:'rgb(0, 51, 153)', textAlign:'center', height:54, color:'#fff', fontSize:18, paddingTop:14, marginTop:25, fontFamily: 'sans-serif'}}>
                  Rate Driver
                </Text>
              </TouchableOpacity>
            </View>*/}
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
