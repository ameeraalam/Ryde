import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Body, Button, Title, Content, Footer, Icon, CardItem, Card, Toast} from 'native-base';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";

//page you will link to when you search for rides as a passenger and click on a ride you are interested in. make sure to send both the ride and passenger obj.
class PassengerSearchProfile extends Component {
  constructor(props){
    super(props);
    this.baseUrl = config();
    this.openMenu = this.openMenu.bind(this);
    this.openNotifications = this.openNotifications.bind(this);
    this.state = {
      loading: false,
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


  requestButton(){
    let resObj = this.props.resObjRyde;
    let reqObj = {

      myRes: this.props.currentPassenger,
      driverRes: this.props.resObjRyde
    }
    this.setState({loading: true});
    fetch(this.baseUrl + "passengerSearch", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqObj)
    }).then((res) => {
      this.setState({loading: false});
      if (res.status === 200) {
        let resObj = this.props.currentPassenger;
        //if request is succesfully sent then we alert the user
        Toast.show({
				text: 'Request successfully sent',
				position: 'top',
				buttonText: 'Okay',
        type: 'success',
				duration: 3000
			});

        Actions.passengerView({resObj});
      } else {
         // not added here
        Toast.show({
				text: 'Cannot send a request twice',
				position: 'top',
				buttonText: 'Okay',
				duration: 3000
			});

      }
    }, (err) => {
      if (err) {
        Toast.show({
				text: 'Cannot request',
				position: 'top',
				buttonText: 'Okay',
				duration: 3000
			});

      }
    });
  }

  getDriverDataSearch(){
    fetch(this.baseUrl + this.props.resObjRyde.driver + "/getDriverDataSearch", {method: "GET"}).then((res) => {
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
    this.getDriverDataSearch();
  }

  ratings(){

    let totalRating = this.state.driverData.totalRating;
    let numRating = this.state.driverData.numRating;
    let rate = Math.round(totalRating/numRating);

    let imgstar = require('./Images/star_filled.png')
    let imgblank = require('./Images/star_unfilled.png')

    let stars = []

    if(numRating === 0){
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
                <Title style={{fontFamily: 'sans-serif'}}>RYDE INFO</Title>
              </Body>
              <Right style={{flex: 1}}>
                <Button onPress = {() => {this.openNotifications()}} transparent>
                  <Icon name='notifications' />
                </Button>
              </Right>
            </Header>
              <Content style={{backgroundColor:'white'}}>
                <View style={{backgroundColor: 'rgb(0, 51, 153)'}}>

                  <Icon name ='person' style={{marginTop: 40, marginLeft: 30, color: 'white'}}><Text>{this.state.driverData.firstName} {this.state.driverData.lastName}</Text></Icon>

                  <Icon name ='mail' style={{fontSize: 20, marginLeft: 30, color: 'white', marginBottom: 20}}><Text>{this.props.resObjRyde.driver}</Text></Icon>

                  <View style={{marginLeft: 30, marginBottom: '3%', flexDirection: 'row'}}>{this.state.starRating}</View>

                </View>

                <View>
                  <Card style={{marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20}}>

                  <CardItem>
                    <Left>
                      <Icon name ='pin' style={{fontSize: 16}}><Text> FROM </Text></Icon>
                    </Left>
                    <Right>
                      <Text style={{color:'black'}}>{this.props.resObjRyde.from}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Left>
                      <Icon name ='pin' style={{fontSize: 16}}><Text> TO </Text> </Icon>
                    </Left>
                    <Right>
                      <Text style={{color:'black'}}>{this.props.resObjRyde.to}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Left>
                      <Icon name ='calendar' style={{fontSize: 16}}><Text> DATE </Text> </Icon>
                    </Left>
                    <Right>
                      <Text style={{color:'black'}}>{this.props.resObjRyde.date}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Left>
                      <Icon name ='briefcase' style={{fontSize: 16}}><Text> LUGGAGE SPACE </Text> </Icon>
                    </Left>
                    <Right>
                    <Text style={{color:'black'}}>{this.props.resObjRyde.numLuggage}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Left>
                      <Icon name ='contacts' style={{fontSize: 16}}><Text> NO. PASSENGER </Text> </Icon>
                    </Left>
                    <Right>
                      <Text style={{color:'black'}}>{this.props.resObjRyde.numPassengers}</Text>
                    </Right>
                  </CardItem>
                </Card>
              </View>
            </Content>
            <View style = {{marginTop: 15, marginBottom: 30, paddingLeft: 15, paddingRight: 15, backgroundColor:'white'}}>

              <TouchableOpacity onPress={() => this.requestButton()}><Text style = {{backgroundColor:'rgb(0, 51, 153)', textAlign:'center', height:54, color:'#fff', fontSize:18, paddingTop:14, marginTop:25, fontFamily: 'sans-serif'}}> Request </Text>
              </TouchableOpacity>

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
module.exports = PassengerSearchProfile;

AppRegistry.registerComponent('PassengerSearchProfile', () => PassengerSearchProfile);
