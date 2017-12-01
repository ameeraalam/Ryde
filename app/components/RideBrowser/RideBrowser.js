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
<<<<<<< HEAD
import { Container, Header, Left, Icon, Body, Button, Right, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem} from 'native-base';
=======
import { Container, Header, Left, Icon, Body, Button, Right, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";


// Comments deleted?
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
<<<<<<< HEAD
                  <Card style={{marginBottom: 20, marginLeft: 5, marginRight: 5}}>
=======
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
                    <CardItem button onPress={() => Actions.passengerSearchProfile({currentPassenger, resObjRyde})}>
                    <Body>
                    <Icon name = 'person' style={{color: 'rgb(0, 51, 153)'}}><Text style={{color: 'rgb(0, 51, 153)'}}> {currentRyde.firstName + " " + currentRyde.lastName}</Text></Icon>
                    <Icon name='calendar' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0,51,153)'}}> {currentRyde.date}</Text></Icon>
                    <Icon name='cash' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}> {currentRyde.price}</Text></Icon>
                    </Body>
                    </CardItem>
                  </Card>
                </View>
            );

            indexCount++;
        }

        this.setState({rydes: allRydes});
    }

<<<<<<< HEAD
  render(){

    return(

      <Notifications
				ref={(notifications) => (this.notifications = notifications)}>
				<Drawer
					ref={(drawer) => this.drawer = drawer}>
					<Container>
<<<<<<< HEAD
						<Header style={{backgroundColor: 'rgb(0, 51, 153)'}}>
=======
						<Header style={{backgroundColor: 'rgb(72, 110, 255)'}}>
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
							<Left style={{flex: 0}}>
								<Button transparent onPress={this.openMenu}>
									<Icon name='menu' />
								</Button>
							</Left>
							<Body style={{alignItems: 'center', flex: 1}}>
<<<<<<< HEAD
								<Title style={{fontFamily: 'sans-serif'}}>Rides</Title>
=======
								<Title style={{fontFamily: 'sans-serif'}}>SEARCH RESULTS</Title>
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
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
=======
=======

class RideBrowser extends Component{

>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
	render(){

		return(

<<<<<<< HEAD wtf
		    <View>
		        {this.state.rydes}
=======
			<View style = {styles.mainStyle}>
				<Text style = {styles.welcome}>
					Ryde Browser
				</Text>
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
			</View>
		);
	}
>>>>>>> 714c84e6fefc24e4b65e2ce4bb445950c41506e6
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
