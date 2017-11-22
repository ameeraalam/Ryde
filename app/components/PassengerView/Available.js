import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
<<<<<<< HEAD
  ScrollView,
  RefreshControl
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import { Container, Header, Left, Right, Icon, Body, Button, Title, Footer, FooterTab, Content, List, CardItem, Fab } from 'native-base';
=======
  FlatList
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Icon, Body, Button, Title, Footer, FooterTab, Content, List, CardItem} from 'native-base';
>>>>>>> master
//this is the main passenger view page. the default page will be available and you can see all the rides you have been accepted in to as a passenger
//when you click on a ride, you get redirected to the PassengerAvailableRideProfile. Here I send both the driver object and passenger object

import config from "./../../config";

class Available extends Component {
  constructor(props){
<<<<<<< HEAD
    super(props);
    this.baseUrl = config();
    this.state = {
      data: [],
      refreshing: false
    }

  }


  findButton(){
=======
  super(props);
  this.address = config.ip;
  this.baseUrl = "http://" + this.address + ":3000/";
  this.state = {
      data: []
    }
  }
  findButton(){

>>>>>>> master
    let resObj = this.props.resObj;
    Actions.rideSearch({resObj});
  }

<<<<<<< HEAD
=======

>>>>>>> master
  retrieveAvailablePosts(){

    return fetch(this.baseUrl + this.props.resObj.email + '/available', {
      method: "GET"
    })
<<<<<<< HEAD
    .then((response) => {
      if(response.status === 200) {
        resObjPromise = response.json();

        resObjPromise.then((resObj) => {
          //alert(JSON.stringify(resObj));
          dataSet = [];
          for(let i=0;i<resObj.length;i++){
            let resO = resObj[i]; //driver object
            let myRes = this.props.resObj; //passenger object
            dataSet.push(
              <View key={i}>
                <CardItem button onPress={()=>
                    Actions.availableProfile({resO, myRes})}>
                    <Body>
                      <Text>From: {resObj[i].from}</Text>
                      <Text>To: {resObj[i].to}</Text>
                      <Text>Date: {resObj[i].date}</Text>
                      <Text style={{left: 320}}>Price: ${resObj[i].price}</Text>
=======
      .then((response) => {
        if(response.status === 200) {
          resObjPromise = response.json();

          resObjPromise.then((resObj) => {
            //alert(JSON.stringify(resObj));
            dataSet = [];
            for(let i=0;i<resObj.length;i++){
              let resO = resObj[i]; //driver object
              let myRes = this.props.resObj; //passenger object
              dataSet.push(
                <View key={i}>
                  <CardItem button onPress={()=>
                  Actions.availableProfile({resO, myRes})}>
                    <Body>
                    <Text>From: {resObj[i].from}</Text>
                    <Text>To: {resObj[i].to}</Text>
                    <Text>Date: {resObj[i].date}</Text>
                    <Text style={{left: 320}}>Price: ${resObj[i].price}</Text>
>>>>>>> master
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
<<<<<<< HEAD
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
=======
      }
      }, (err) => {
        alert(err)
      });
  }

  componentDidMount(){
    this.retrieveAvailablePosts();
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
              <Icon name='notifications' />
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
                  <Button active vertical>
                         <Icon active name="checkmark-circle" color='white' size={24} />
                         <Text style={styles.text}> Available </Text>
                      </Button>
                      <Button vertical onPress={() => Actions.pending({resObj})}>
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

module.exports = Available;

AppRegistry.registerComponent('Available', () => Available);
>>>>>>> master
