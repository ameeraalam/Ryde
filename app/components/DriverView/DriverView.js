import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from "react-native";
import {Actions } from 'react-native-router-flux';
import { Container, Header, Left, Body, Right, Button, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';
export default class DriverView extends Component {

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
		}
	}

	retrievePosts(){

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
		//retrieve data from the db and then add the reqobj in to an array and then push this array in to lists, and create the list.

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
				<Content>
					<List dataArray={this.retrievePosts({})}
						renderRow={(list) =>
							<ListItem onPress={() => Actions.driverProfile({})}>
								<Text>{list}</Text>
							</ListItem>
						}>
					</List>
				</Content>
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


module.exports = DriverView;

AppRegistry.registerComponent("DriverView", () => DriverView);
