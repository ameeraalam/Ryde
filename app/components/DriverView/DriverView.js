import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	FlatList
} from "react-native";
import {Actions } from 'react-native-router-flux';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';
import Config from '../../config';
import Drawer from '../Drawer/Drawer';


export default class DriverView extends Component {

	constructor(props){
	super(props);
	this.address = Config.ip;
	this.baseUrl = "http://" + this.address + ":3000/";
	this.openMenu = this.openMenu.bind(this);
	this.state = {
			from: []
		}
	}


	openMenu() {
    this.drawer.openDrawer();
  }


	retrievePosts(){

    return fetch(this.baseUrl + 'driverView')
      .then((response) => {
				if(response.status === 200){
					response.json()
					console.log(response.json());
				}
				else {
					alert(Error)
					console.log(response.json);
				}}, (err) =>
					alert(err)
			)
      .then((responseJson) => {

				if(typeof responseJson === 'undefined'){
					console.log('undefined')
				}
				else{
        this.setState({from: responseJson.from});
			}
		}, err =>
			alert(err)
	)
      .catch((error) => {
        console.error(error);
      });
  }

  // componentDidMount(){
	// 	this.retrievePosts();
	// }

  render() {
		//retrieve data from the db and then add the reqobj in to an array and then push this array in to lists, and create the list.
		//console.log("Rovers: ", this.state.rovers);
    return (
			<Drawer
				isPassenger={false}
				role = {'to Passenger'}
				ref={(_drawer) => this.drawer = _drawer}>
	      <Container>
	        <Header style={{backgroundColor:'rgb(72, 110, 255)'}}>
	          <Left>
	            <Button transparent onPress={this.openMenu}>
	              <Icon name='menu' color='white' />
	            </Button>
	          </Left>
	          <Left>
	            <Button transparent>
	                <Icon name='notifications' color='white' />
	            </Button>
	          </Left>
	          <Body>
	            <Title>RYDE</Title>
	          </Body>
	          <Right>
	            <Button transparent>
	              <Icon name='add' color='white' />
	            </Button>
	          </Right>
	        </Header>
					<Content style={styles.flatlist}>
					<FlatList
						data={this.state.from}
						keyExtractor={(x,i) => i}
						renderItem={({item}) =>
							<Text>
								{item}
							</Text>}
					>
					</FlatList>
					</Content>
	      </Container>
			</Drawer>
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
			 flex: 1,
			 backgroundColor:'#fff'
		 }
});


module.exports = DriverView;

AppRegistry.registerComponent("DriverView", () => DriverView);
