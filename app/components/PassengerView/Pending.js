import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
<<<<<<< HEAD
  StatusBar,
  ScrollView,
  RefreshControl
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Left, Right, Icon, Body, Button, Title, Footer, FooterTab, Content, List, CardItem, Fab } from 'native-base';
=======
  FlatList
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Icon, Body, Button, Title, Footer, FooterTab, Content, List, CardItem} from 'native-base';
>>>>>>> master
//this is not the main passenger view page. the default page will be available and you can come to this page by selecting on the pending footer tab. all the rides you have requested to join in as a passenger
//when you click on a ride, you get redirected to the PassengerPendingRideProfile. Here I send both the ride object and passenger object

import config from "./../../config";

class Pending extends Component {

  constructor(props){
<<<<<<< HEAD
    super(props);
    this.baseUrl = config();
    this.state = {
      data: [],
      refreshing: false
=======
  super(props);
  this.address = config.ip;
  this.baseUrl = "http://" + this.address + ":3000/";
  this.state = {
      data: []
>>>>>>> master
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
<<<<<<< HEAD
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
              <CardItem button
              onPress={()=>
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
=======
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
>>>>>>> master
            }
            this.setState({data: dataSet})
          })
        }
      }, (err) => {
        alert(err)
      });
<<<<<<< HEAD
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
        <ScrollView
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
          />
        }>
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

  module.exports = Pending;

  AppRegistry.registerComponent('Pending', () => Pending);
=======
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
>>>>>>> master
