import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Body, Button, Title, Footer, FooterTab, Content, List, ListItem} from 'native-base';

export default class Available extends Component {
  constructor(props){
  super(props);
  //change ip address
  this.address = "192.168.2.76";
  this.baseUrl = "http://" + this.address + ":3000/";
  this.state = {
    fromLocation: "From",
    toLocation: "To",
    travelDate: "Date",
    numPassengers: "Passenger Spots",
    numLuggage: "Luggage Space"
    //will need to add a hidden field or boolean that sets the object to pending or requested according to drivers acceptance
    }
  }

  retrieveAvailablePosts(){

    let reqObj = {
      email: this.props.resObj.email,
      from: this.state.fromLocation,
      to: this.state.toLocation,
      date: this.state.travelDate,
      passengers: this.state.numPassengers,
      luggage: this.state.numLuggage
    }

    fetch(this.baseUrl + "", {
      method: "GET",
      headers: {
        "Accept:": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify
    });

    let lists = [];
    if(reqObj != null) {
      lists.push(reqObj);
    }
    else {
      alert("Error loading db");
    }

    return lists;

  }
  render() {
    return (
      <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='bars' color='white' size={24} />
          </Button>
        </Left>
        <Left>
          <Button transparent>
              <Icon name='bell-o' color='white' size={24} />
          </Button>
        </Left>
        <Body>
          <Title>RYDE</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='search' color='white' size={24} />
          </Button>
        </Right>
      </Header>
      <Content>
        <List dataArray={this.retrieveAvailablePosts({})}
          renderRow={(list) =>
            <ListItem onPress={() => Actions.availableProfile({})}>
              <Text>{list}</Text>
            </ListItem>
          }>
        </List>
      </Content>
      <Footer>
        <FooterTab>
                  <Button active vertical onPress={() => Actions.available({})}>
                         <Icon active name="check-circle" color='white' size={24} />
                         <Text style={styles.text}> Available </Text>
                      </Button>
                      <Button vertical onPress={() => Actions.pending({})}>
                         <Icon name="question-circle" color='white' size={24}  />
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
     }
});

module.exports = Available;

AppRegistry.registerComponent('Available', () => Available);
