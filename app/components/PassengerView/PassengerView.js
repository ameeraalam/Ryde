import React, { Component } from 'react';
import { View, Text, AppRegistry,StatusBar } from "react-native";
import { Container, Header, Content, Icon, Left, Right, Button, Title, Body, TabHeading, Tab, Tabs, Fab, Badge } from 'native-base';
import Available from './Available';
import Pending from './Pending';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';


class PassengerView extends Component {

  constructor(props){
    super(props);
    this.openMenu = this.openMenu.bind(this);
    this.openNotifications = this.openNotifications.bind(this);
    this.setBadge = this.setBadge.bind(this);
    this.state = {
      placeBadge: false
    }
  }


  componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}


  openNotifications(){
    this.notifications.openDrawer();
  }

  openMenu() {
    this.drawer.openDrawer();
  }


  setBadge(num) {
    if(num > 0){
			if(this._isMounted){
       	this.setState({placeBadge: true});
			}
    } else {
			if(this._isMounted){
	      this.setState({placeBadge: false});
			}
		}
  }


  render() {
    let resObj = this.props.resObj
    let displayBadge = (<Badge style={{ position: 'absolute', right: 14, top: 9, paddingTop: 0,
      paddingBottom: 0, borderRadius: 100, height: 11, zIndex: 1 }}/>)

    return (
      <Notifications
        badgeFunc = {this.setBadge}
        isPassenger={true}
        resObj = {this.props.resObj}
        driverFilledObj = {this.props.driverFilledObj}
        ref={(notifications) => (this.notifications = notifications)}>
        <Drawer
          isPassenger={true}
          resObj = {this.props.resObj}
          driverFilledObj = {this.props.driverFilledObj}
          ref={(drawer) => this.drawer = drawer}>
      <Container>
        <Header style={{backgroundColor: 'rgb(72, 110, 255)'}}>
          <Left style={{flex: 1}}>
            <Button transparent onPress={this.openMenu}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body style={{alignItems: 'center', flex: 1}}>
            <Title style={{fontFamily: 'sans-serif'}}>DASHBOARD</Title>
          </Body>
          <Right style={{flex: 1}}>
            <Button badge onPress = {() => {this.openNotifications()}} transparent>
              {this.state.placeBadge && displayBadge}
              <Icon name='notifications' />
            </Button>
          </Right>
        </Header>
        <Tabs initialPage={0} tabBarPosition='bottom' >
          <Tab heading={ <TabHeading style={{backgroundColor: 'rgb(72, 110, 255)'}}><Icon active name="checkmark-circle"/><Text style={{color:'white', fontSize: 16, fontFamily: 'sans-serif', marginLeft: 10}}>Available</Text></TabHeading>}>
            <Available isPassenger={true} resObj={resObj} driverFilledObj = {this.props.driverFilledObj} />
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: 'rgb(72, 110, 255)'}}><Icon active name="time" /><Text style={{color:'white', fontSize: 16, fontFamily: 'sans-serif', marginLeft: 10}}>Pending</Text></TabHeading>}>
            <Pending isPassenger={true} resObj={resObj} driverFilledObj = {this.props.driverFilledObj} />
          </Tab>
        </Tabs>
      </Container>
    </Drawer>
  </Notifications>
    );
  }
}

module.exports = PassengerView;

AppRegistry.registerComponent("PassengerView", () => PassengerView);
