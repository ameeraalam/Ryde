import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Icon, Body, Button, Title, Footer, FooterTab, Content, List, CardItem} from 'native-base';
//this is not the main passenger view page. the default page will be available and you can come to this page by selecting on the pending footer tab. all the rides you have requested to join in as a passenger
//when you click on a ride, you get redirected to the PassengerPendingRideProfile. Here I send both the ride object and passenger object

import config from "./../../config";

class Pending extends Component {

  constructor(props){
  super(props);
  this.address = config.ip;
  this.baseUrl = "http://" + this.address + ":3000/";
  this.state = {
      data: []
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
                  <CardItem button onPress={()=>
                  Actions.pendingProfile({resO, myRes})}>
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
      }, (err) => {
        alert(err)
      });
  }

  componentDidMount(){
    this.retrievePendingPosts();
  }

  render() {
    let resObj = this.props.resObj;

    return (
      <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Left>
          <Button transparent>
              <Icon name='notifications'  />
          </Button>
        </Left>
        <Body>
          <Title>RYDE</Title>
        </Body>
        <Right>
          <Button onPress = {() => {this.findButton()}} transparent>
            <Icon name='search' />
          </Button>
        </Right>
      </Header>
      <Content>
      {this.state.data}
      </Content>
      <Footer>
        <FooterTab>
                  <Button active vertical onPress={() => Actions.available({resObj})}>
                         <Icon active name="checkmark-circle" color='white' size={24} />
                         <Text style={styles.text}> Available </Text>
                      </Button>
                      <Button vertical>
                         <Icon name="help" color='white' size={24}  />
                         <Text style={styles.text}> Pending </Text>
                      </Button>
                   </FooterTab>
               </Footer>
    </Container>

    );
  }
}

const styles = StyleSheet.create({
     text: {
        color: 'white',
        fontSize: 16,
     },

     flatlist: {
       marginTop: 25,
       flex: 1
     }
});

module.exports = Pending;

AppRegistry.registerComponent('Pending', () => Pending);
