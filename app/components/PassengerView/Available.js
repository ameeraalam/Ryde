import React, { Component } from 'react';
<<<<<<< HEAD
import Icon from 'react-native-vector-icons/FontAwesome';
=======
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
import {
  AppRegistry,
  StyleSheet,
  Text,
<<<<<<< HEAD
  View
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Body, Button, Title, Footer, FooterTab, Content, List, ListItem} from 'native-base';

export default class Available extends Component {
  render() {
    //i will change this list later to contain array of objects from the db. it will consist of all the rides the user has already been accepted in to. for now, there is harcoded random data.
    var lists = ['Ride #1', 'Ride #2', 'Ride #3'];
=======
  View,
  FlatList
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Icon, Body, Button, Title, Footer, FooterTab, Content, List, CardItem} from 'native-base';
//this is the main passenger view page. the default page will be available and you can see all the rides you have been accepted in to as a passenger
//when you click on a ride, you get redirected to the PassengerAvailableRideProfile. Here I send both the driver object and passenger object

class Available extends Component {
  constructor(props){
  super(props);
  this.address = "192.168.0.30";
  this.baseUrl = "http://" + this.address + ":3000/";
  this.state = {
      data: []
    }
  }

  retrieveAvailablePosts(){

    return fetch(this.baseUrl + this.props.resObj.email + '/available', {
      method: "GET"
    })
      .then((response) => {
				if(response.status === 200) {
					resObjPromise = response.json();

					resObjPromise.then((resObj) => {
						//alert(JSON.stringify(resObj));
            dataSet = [];
            for(let i=0;i<resObj.length;i++){
              let resO = resObj[i]; //driver object
              let myRes = this.props.resObj; //passenger object
              dataSet.push(
                <View key={i}>
                  <CardItem button onPress={()=>
                  Actions.availableProfile({resO, myRes})}>
                    <Body>
                    <Text>From: {resObj[i].from}</Text>
                    <Text>To: {resObj[i].to}</Text>
                    <Text>Date: {resObj[i].date}</Text>
  									<Text style={{left: 320}}>Price: ${resObj[i].price}</Text>
                    </Body>
                  </CardItem>
                  <Text></Text>
                </View>
              )
            }
						this.setState({data: dataSet})
					})
				}

				else { alert('You do not have any available requests');
			}
			}, (err) => {
				alert(err)
			});
  }

  componentDidMount(){
		this.retrieveAvailablePosts();
	}

  render() {
    let resObj = this.props.resObj;
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
    return (
      <Container>
      <Header>
        <Left>
          <Button transparent>
<<<<<<< HEAD
            <Icon name='bars' color='white' size={24} />
=======
            <Icon name='menu' />
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
          </Button>
        </Left>
        <Left>
          <Button transparent>
<<<<<<< HEAD
              <Icon name='bell-o' color='white' size={24} />
=======
              <Icon name='notifications' />
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
          </Button>
        </Left>
        <Body>
          <Title>RYDE</Title>
        </Body>
        <Right>
          <Button transparent>
<<<<<<< HEAD
            <Icon name='search' color='white' size={24} />
=======
            <Icon name='search' />
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
          </Button>
        </Right>
      </Header>
      <Content>
<<<<<<< HEAD
        <List dataArray={lists}
          renderRow={(list) =>
            <ListItem onPress={() => Actions.availableProfile({})}>
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
=======
      {this.state.data}
      </Content>
      <Footer>
        <FooterTab>
                  <Button active vertical>
                         <Icon active name="checkmark-circle" color='white' size={24} />
                         <Text style={styles.text}> Available </Text>
                      </Button>
                      <Button vertical onPress={() => Actions.pending({resObj})}>
                         <Icon name="help" color='white' size={24}  />
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
                         <Text style={styles.text}> Pending </Text>
                      </Button>
                   </FooterTab>
               </Footer>
    </Container>
<<<<<<< HEAD
=======

>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
    );
  }
}

const styles = StyleSheet.create({
     text: {
        color: 'white',
        fontSize: 16,
<<<<<<< HEAD
     }
=======
     },

     flatlist: {
			 marginTop: 25,
			 flex: 1
		 }
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
});

module.exports = Available;

AppRegistry.registerComponent('Available', () => Available);
