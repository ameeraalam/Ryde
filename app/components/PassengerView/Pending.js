import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Body, Button, Icon, Title, Footer, FooterTab, Content, List, ListItem} from 'native-base';
import Config from '../../config';
import Drawer from '../Drawer/Drawer';

export default class Pending extends Component {

  constructor(props){
  super(props);
  //change ip address
  this.address = Config.ip;
  this.openMenu = this.openMenu.bind(this);
  // this.baseUrl = "http://" + this.address + ":3000/";
  this.state = {
    fromLocation: "From",
    toLocation: "To",
    travelDate: "Date",
    numPassengers: "Passenger Spots",
    numLuggage: "Luggage Space"
    }
  }

  openMenu() {
    this.drawer.openDrawer();
  }

  retrievePendingPosts(){

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
      <Drawer
        isPassenger={true}
        role = {'to Driver'}
				ref={(_drawer) => this.drawer = _drawer}>
        <Container>
          <Header style={{backgroundColor:'rgb(72, 110, 255)'}}>
            <Left>
              <Button transparent onPress={this.openMenu}>
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
              <Button transparent>
                <Icon name='search' />
              </Button>
            </Right>
          </Header>
          <Content>
            <List /*dataArray={this.retrievePendingPosts({})}*/
              renderRow={(list) =>
                <ListItem onPress={() => Actions.pendingProfile({})}>
                  <Text>{list}</Text>
                </ListItem>
              }>
            </List>
          </Content>
          <Footer>
            <FooterTab>
              <Button active vertical onPress={() => Actions.available({})}>
                <Icon active name="checkmark-circle" color='white' size={24} />
                <Text style={styles.text}> Available </Text>
              </Button>
              <Button vertical onPress={() => Actions.pending({})}>
                <Icon name="help" color='white' size={24}  />
                <Text style={styles.text}> Pending </Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
     text: {
        color: 'white',
        fontSize: 16,
     }
});

module.exports = Pending;

AppRegistry.registerComponent('Pending', () => Pending);
