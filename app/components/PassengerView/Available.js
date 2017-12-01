import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import { Container, Header, Left, Right, Icon, Body, Button, Title, Footer, FooterTab, Content, List, CardItem, Fab } from 'native-base';
//this is the main passenger view page. the default page will be available and you can see all the rides you have been accepted in to as a passenger
//when you click on a ride, you get redirected to the PassengerAvailableRideProfile. Here I send both the driver object and passenger object

import config from "./../../config";

class Available extends Component {
  constructor(props){
    super(props);
    this.baseUrl = config();
    this.state = {
      data: [],
      refreshing: false
    }

  }

  // let {isPassenger, resObj, driverFilledObj} = this.props;
  findButton(){
    let {isPassenger, resObj, driverFilledObj} = this.props;
    Actions.rideSearch({isPassenger, resObj, driverFilledObj});
  }

  retrieveAvailablePosts(){

    return fetch(this.baseUrl + this.props.resObj.email + '/available', {
      method: "GET"
    })
    .then((response) => {
      if(response.status === 200) {
        resObjPromise = response.json();

        resObjPromise.then((resObj) => {
          //alert(JSON.stringify(resObj));
          dataSet = [];
          let {isPassenger, driverFilledObj} = this.props;
          for(let i=0;i<resObj.length;i++){
            let resO = resObj[i]; //driver object
            let myRes = this.props.resObj; //passenger object
            dataSet.push(
              <View key={i}>
                <CardItem button onPress={()=>
                    Actions.availableProfile({isPassenger, resO, myRes, driverFilledObj})}>
                    <Body>
                      <Text>From: {resObj[i].from}</Text>
                      <Text>To: {resObj[i].to}</Text>
                      <Text>Date: {resObj[i].date}</Text>
                      <Text style={{left: 320}}>Price: ${resObj[i].price}</Text>
                    </Body>
                  </CardItem>
                  <Text></Text>
                </View>
              )
            }
            this.setState({data: dataSet})
          })
        }

        else { alert('You do not have any available requests');
        }
      }, (err) => {
        alert(err)
      });
    }

    componentDidMount(){
      this.retrieveAvailablePosts();
    }

    onRefresh(){
      this.setState({refreshing:true});
      this.retrieveAvailablePosts().then(()=> {
        this.setState({refreshing:false});
      })
    }


    render() {

      return (
        <Container>
          <ScrollView
            refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
            />}
          >
            <Content>
              {this.state.data}
            </Content>
          </ScrollView>
          <View>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: 'rgb(72, 110, 255)' }}
              position="bottomRight"
              onPress={() => {this.findButton()}}>
              <Icon name="search" />
            </Fab>
          </View>
        </Container>


        );
      }
    }

    module.exports = Available;

    AppRegistry.registerComponent('Available', () => Available);
