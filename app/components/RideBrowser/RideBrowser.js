import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import { Container, Header, Left, Icon, Body, Button, Right, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";

class RideBrowser extends Component{

    constructor(props){
        super(props);
        this.baseUrl = config();
        this.openMenu = this.openMenu.bind(this);
        this.openNotifications = this.openNotifications.bind(this);
        this.state = {rydes: []}
    }

    openNotifications(){
      this.notifications.openDrawer();
    }

    openMenu() {
      this.drawer.openDrawer();
    }


    componentDidMount(){
        this.loadRydes();
    }

    loadRydes(){

        let allRydes = [];
        let currentPassenger = this.props.passedResObj;
        let currentRyde = null;
        let indexCount = 0;
        let rydeForButton = [];

        for (let i = 0; i < this.props.resObj.dest.length;  i++){

            currentRyde = this.props.resObj.dest[i];
            rydeForButton.push(currentRyde);
            let resObjRyde = rydeForButton[indexCount];

            allRydes.push(
                <View key={i}>
                    <CardItem button onPress={() => Actions.passengerSearchProfile({currentPassenger, resObjRyde})}>
                    <Body>
                    <Text>Driver: {currentRyde.firstName + " " + currentRyde.lastName}</Text>
                    <Text>Price: {currentRyde.price}</Text>
                    </Body>
                    </CardItem>
                </View>
            );

            indexCount++;
        }

        this.setState({rydes: allRydes});
    }

  render(){

    return(

      <Notifications
				ref={(notifications) => (this.notifications = notifications)}>
				<Drawer
					ref={(drawer) => this.drawer = drawer}>
					<Container>
						<Header style={{backgroundColor: 'rgb(72, 110, 255)'}}>
							<Left style={{flex: 0}}>
								<Button transparent onPress={this.openMenu}>
									<Icon name='menu' />
								</Button>
							</Left>
							<Body style={{alignItems: 'center', flex: 1}}>
								<Title style={{fontFamily: 'sans-serif'}}>SEARCH RESULTS</Title>
							</Body>
							<Right style={{flex: 0}}>
								<Button onPress = {() => {this.openNotifications()}} transparent>
									<Icon name='notifications' />
								</Button>
							</Right>
						</Header>
        <Content>
            {this.state.rydes}
      </Content>
    </Container>
  </Drawer>
</Notifications>

    );
  }
}

const styles = StyleSheet.create({

    mainStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },

    inputBox: {
      height: 40,
      width: 200,
      borderColor: '#000000',
      borderWidth: 1
    },

  welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: '#000000',
    },

    instructions: {
      textAlign: 'center',
      color: '#FFFFFF',
      marginBottom: 5,
    },

    myImage: {
      justifyContent: 'center',
      alignItems: 'center'
    }
});

module.exports = RideBrowser;
AppRegistry.registerComponent("RideBrowser", () => RideBrowser);
