import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Body, Button, Title, Footer, FooterTab, Content, List, ListItem} from 'native-base';

export default class Pending extends Component {
  render() {
    //i will change this list later to contain array of objects from the db. it will consist of all the rides the user has requested to join in. for now, there is harcoded random data.
    var lists = ['Ride #1 Pending', 'Ride #2', 'Ride #3'];
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
            <Icon name='search' color='white' size={24} />
          </Button>
        </Right>
      </Header>
      <Content>
        <List dataArray={lists}
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
                         <Icon active name="check-circle" color='white' size={24} />
                         <Text style={styles.text}> Available </Text>
                      </Button>
                      <Button vertical onPress={() => Actions.pending({})}>
                         <Icon name="question-circle" color='white' size={24}  />
                         <Text style={styles.text}> Pending </Text>
                      </Button>
                   </FooterTab>
               </Footer>
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

module.exports = Pending;

AppRegistry.registerComponent('Pending', () => Pending);
