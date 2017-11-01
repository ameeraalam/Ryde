import React, { Component } from 'react';
import { AppRegistry,StyleSheet, View, DrawerLayoutAndroid, Image } from 'react-native';
import { Container, Header, Title, Left, Icon, Text, Right, Button, Center, Footer, FooterTab,
          Body, Content, Card, CardItem, Grid, Row, Col, List, ListItem, Switch } from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./Styles";

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
    this.switchRole = this.switchRole.bind(this);
  }

  openDrawer() {
    this.drawer.openDrawer();
  }

  // If a function uses "this", make sure to bind it in the constructor becauseit loses it's this when the function is called
  switchRole() { //check if this.props.isPassenger is undefined first
    if (this.props.isPassenger !== undefined) {
      if (this.props.isPassenger) {
  		  Actions.driverview({type: 'reset'});
      } else {
        Actions.available({type: 'reset'});
      }
    }
	}


  contactUs() {
    Actions.contactUs({});
  }


  logOut() {
		Actions.login({type: 'reset'});
	}


  render() {
    var navigationView = (
      <View style={styles.firstDivision}>
        <View style={styles.profile}>
          <Image style={styles.userPlaceholder}
          source={require('./images/user_placeholder.png') } />
          <Text style={{color:'#fff', fontSize:20, marginTop:20, fontFamily: 'sans-serif'}}>Brian West</Text>

          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            <Image style={{height:15, width: 15, marginTop:6}}
            source={require('./images/star.png') }/>
            <Text style={{color:'#fff', marginTop:5.5, fontSize:14, marginLeft:2, fontFamily: 'sans-serif'}}> 4.21 </Text>
          </View>
        </View>

        <View style={{flex: 2, backgroundColor: '#fff', marginTop:50}}>
              <List>
                <ListItem icon onPress={this.switchRole}>
                  <Left>
                    <Icon name="swap" style={{color: 'rgb(72, 110, 255)'}} />
                  </Left>
                  <Body>
                    <Text style={{color:'black', fontSize:18, fontFamily: 'sans-serif'}}>Switch {this.props.role}</Text>
                  </Body>
                  <Right />
                </ListItem>

                <ListItem icon style={{marginTop:20}} onPress={this.contactUs}>
                  <Left>
                    <Icon name="call" style={{color: 'rgb(72, 110, 255)'}} />
                  </Left>
                  <Body>
                    <Text style={{color:'black', fontSize:18, fontFamily: 'sans-serif'}}>Contact Us</Text>
                  </Body>
                  <Right />
                </ListItem>

                <ListItem icon style={{marginTop:20}} onPress={this.logOut}>
                  <Left>
                    <Icon name="power" style={{color: 'rgb(72, 110, 255)'}} />
                  </Left>
                  <Body>
                    <Text style={{color:'black', fontSize:18, fontFamily: 'sans-serif'}}>Logout</Text>
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
        ref={_drawer => (this.drawer = _drawer)}
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
