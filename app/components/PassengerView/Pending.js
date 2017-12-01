import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  RefreshControl
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Left, Right, Icon, Body, Button, Title, Footer, FooterTab, Content, List, Card, CardItem, Fab, Toast } from 'native-base';
//this is not the main passenger view page. the default page will be available and you can come to this page by selecting on the pending footer tab. all the rides you have requested to join in as a passenger
//when you click on a ride, you get redirected to the PassengerPendingRideProfile. Here I send both the ride object and passenger object

import config from "./../../config";

class Pending extends Component {

  constructor(props){
    super(props);
    this.baseUrl = config();
    this.state = {
      data: [],
      refreshing: false,
      showToast: false

    }
  }

  findButton(){

    let resObj = this.props.resObj;
    Actions.rideSearch({resObj});
  }

  retrievePendingPosts(){

    return fetch(this.baseUrl + this.props.resObj.email + '/pending', {
      method: "GET"
    })
    .then((response) => {
      if(response.status === 200) {
        resObjPromise = response.json();

        resObjPromise.then((resObj) => {
          dataSet = [];
          for(let i=0;i<resObj.length;i++){
            let resO = resObj[i]; //ride obj
            let myRes = this.props.resObj; //passenger obj

            dataSet.push(
              <View key={i}>
              <Card>
                <CardItem button
                onPress={()=>
                  Actions.pendingProfile({resO, myRes})}>
                  <Body>

                  <Icon name='pin' style={{color: 'rgb(0, 51, 153)'}}><Text style={{color: 'rgb(0, 51, 153)'}}> {resObj[i].from} - {resObj[i].to}</Text></Icon>

                  <Icon name='calendar' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}>  {resObj[i].date}</Text></Icon>

                  <Icon name='cash' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}> {resObj[i].price}</Text></Icon>

                  </Body>
                  </CardItem>
                </Card>
                <Text></Text>
                </View>
              )
            }
            this.setState({data: dataSet})
          })
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

    componentDidMount(){
      this.retrievePendingPosts();
    }

    onRefresh(){
      this.setState({refreshing: true});
      this.retrievePendingPosts().then(() => {
        this.setState({refreshing:false});
      });
    }


    render() {
      let resObj = this.props.resObj;
      //this.retrievePendingPosts();

      return (
        <Container>
        <Content
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
          colors={['red']}
          />
        }>

        {this.state.data}

        </Content>
        <View>
        <Fab
        active={this.state.active}
        direction="up"
        containerStyle={{ }}
        style={{ backgroundColor: 'rgb(0, 51, 153)' }}
        position="bottomRight"
        onPress={() => {this.findButton()}}>
        <Icon name="search" />
        </Fab>
        </View>
        </Container>


      );
    }
  }

  module.exports = Pending;

  AppRegistry.registerComponent('Pending', () => Pending);
