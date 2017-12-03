import React, { Component } from 'react';
import { AppRegistry,StyleSheet, View, DrawerLayoutAndroid, Image } from 'react-native';
import { Container, Header, Title, Left, Icon, Text, Right, Button, Center, Footer, FooterTab,
  Body, Content, Card, CardItem, Grid, Row, Col, List, ListItem, Switch } from "native-base";
  import { Actions } from "react-native-router-flux";
  import styles from "./styles";

  class Drawer extends Component {
    constructor(props) {
      super(props);
      this.openDrawer = this.openDrawer.bind(this);
      this.switchRole = this.switchRole.bind(this);
      this.setRoleName = this.setRoleName.bind(this);
      this.setUserName = this.setUserName.bind(this);
      this.state = {
        roleName: '',
        username: `pass me resObj props`
      }
    }

    openDrawer() {
      this.drawer.openDrawer();
    }

    componentDidMount() {
      this.setRoleName();
      this.setUserName();
    }

    setUserName() {
      if(this.props.resObj) {
        const {firstName, lastName} = this.props.resObj;
        this.setState({username: `${firstName} ${lastName}`});
      } else {
        this.setState({username: `pass me resObj props`});
      }
    }

    // If a function uses "this", make sure to bind it in the constructor becauseit loses it's this when the function is called
    switchRole() { //check if this.props.isPassenger is undefined first
      const {resObj, driverFilledObj} = this.props;
      if (this.props.isPassenger !== undefined) {
        if (this.props.isPassenger) {

          if(!this.props.driverFilledObj.isDriverInfoFilled){
            Actions.driverInfo({type: 'replace', resObj, driverFilledObj});
          } else {
            let isPassenger = false;
            Actions.driverView({type: 'reset', isPassenger, resObj, driverFilledObj});
          }
        } else {
          Actions.passengerView({type: 'reset', resObj, driverFilledObj});
        }
      }
    }

    setRoleName() {
      if(this.props.isPassenger !== undefined) {
        if (this.props.isPassenger) {
          this.setState({roleName: 'to Driver'});
        } else {
          this.setState({roleName: 'to Passenger'});
        }
      } else {
        this.setState({roleName: 'Role'});
      }
    }


    contactUs() {
      Actions.contactUs();
    }


    logOut() {
      Actions.login({type: 'reset'});
    }


    render() {
      var navigationView = (
        <View style={styles.firstDivision}>
          <View style={styles.profile}>
            <Image style={styles.userPlaceholderImage}
              source={require('./images/user_placeholder.png')} />
            <Text style={styles.userName}>{this.state.username}</Text>

            <View style={styles.rating}>
              <Image style={styles.star}
                source={require('./images/star.png')} />
              <Text style={styles.ratingNum}>4.21 (30)</Text>
            </View>
          </View>

          <View style={styles.drawerOptions}>
            <List>
              <ListItem icon onPress={this.switchRole}>
                <Left>
                  <Icon name="swap" style={styles.drawerIcons} />
                </Left>
                <Body>
                  <Text disabled style={styles.drawerItems}>Switch {this.state.roleName}</Text>
                </Body>
                <Right />
              </ListItem>

              <ListItem icon style={styles.drawerOptionsMargin} onPress={this.contactUs}>
                <Left>
                  <Icon name="call" style={styles.drawerIcons} />
                </Left>
                <Body>
                  <Text style={styles.drawerItems}>Contact Us</Text>
                </Body>
                <Right />
              </ListItem>

              <ListItem icon style={styles.drawerOptionsMargin} onPress={this.logOut}>
                <Left>
                  <Icon name="power" style={styles.drawerIcons} />
                </Left>
                <Body>
                  <Text style={styles.drawerItems}>Logout</Text>
                </Body>
                <Right />
              </ListItem>
            </List>
          </View>
        </View>
      );

      return (
        <DrawerLayoutAndroid
          drawerWidth={300}
          ref={(drawer) => (this.drawer = drawer)}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          drawerLockMode='locked-closed'
          renderNavigationView={() => navigationView}>
          {this.props.children}
        </DrawerLayoutAndroid>
      );

    }

  }

  module.exports = Drawer;

  AppRegistry.registerComponent('Drawer', () => Drawer);
