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
  render() {
		var lists = ['Ride #1', 'Ride #2', 'Ride #3'];

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
					<List dataArray={lists}
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
