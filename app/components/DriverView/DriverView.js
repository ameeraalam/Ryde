import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	FlatList
} from "react-native";
import {Actions } from 'react-native-router-flux';
import { Container, Header, Left, Body, Right, Button, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';
import test from '../DriverView/test.js' ;
export default class DriverView extends Component {

	constructor(props){
	super(props);
	this.address = "192.168.2.76";
	this.baseUrl = "http://" + this.address + ":3000/";
	this.state = {
			from: []
		}
	}

	retrievePosts(){

    return fetch(this.baseUrl + 'driverView')
      .then((response) => {
				if(response.status === 200){
					response.json()
				}
				else {
					alert(Error);
				}})
      .then((responseJson) => {

				if(typeof responseJson === 'undefined'){
					console.log('undefined')
				}
				else{
        this.setState({from: responseJson.from});
			}
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount(){
		this.retrievePosts();
	}

  render() {
		//retrieve data from the db and then add the reqobj in to an array and then push this array in to lists, and create the list.
		//console.log("Rovers: ", this.state.rovers);
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
              <Icon name='plus' color='white' size={24} />
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


module.exports = DriverView;

AppRegistry.registerComponent("DriverView", () => DriverView);
