import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import { Container, Header, Left, Right, Icon, Body, Button, Title, Footer, FooterTab, Content, List, Card, CardItem, Fab, Toast } from 'native-base';
//this is the main passenger view page. the default page will be available and you can see all the rides you have been accepted in to as a passenger
//when you click on a ride, you get redirected to the PassengerAvailableRideProfile. Here I send both the driver object and passenger object

import config from "./../../config";

class Available extends Component {
  constructor(props){
    super(props);
    this.baseUrl = config();
    this.state = {
      data: [],
      refreshing: false,
      showToast: false
    }

  }

  findButton(){
    let resObj = this.props.resObj;
    Actions.rideSearch({resObj});
  }

  retrieveAvailablePosts(){
    return fetch(this.baseUrl + this.props.resObj.email + '/available', {
      method: "GET"
    })
    .then((response) => {
      if(response.status === 200) {
        resObjPromise = response.json();

        resObjPromise.then((resObj) => {
          dataSet = [];
          for(let i=0;i<resObj.length;i++){
            let resO = resObj[i]; //driver object
            let myRes = this.props.resObj; //passenger object
            dataSet.push(
              <View key={i}>
                <Card style={{marginBottom: 20, marginLeft: 5, marginRight: 5}}>
                  <CardItem button onPress={()=>
                      Actions.availableProfile({resO, myRes})}>
                    <Body>

                      <Icon name='pin' style={{color: 'rgb(0, 51, 153)'}}><Text style={{color: 'rgb(0, 51, 153)'}}> {resObj[i].from} - {resObj[i].to}</Text></Icon>

        							<Icon name='calendar' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}>  {resObj[i].date}</Text></Icon>

        							<Icon name='cash' style={{color: 'rgb(0, 51, 153)', fontSize: 14}}><Text style={{color: 'rgb(0, 51, 153)'}}> {resObj[i].price}</Text></Icon>

                      </Body>
                    </CardItem>
                  </Card>
                </View>
              )
            }
            this.setState({data: dataSet})
          })
        }

        else {

        Toast.show({
				text: 'You do not have any available requests',
				position: 'top',
				buttonText: 'Okay',
				duration: 3000
			});
        }
      }, (err) => {
        Toast.show({
				text: 'Promise Error:\nUnhandled promise',
				position: 'top',
				buttonText: 'Okay',
				duration: 3000
			});

      });
    }

    componentDidMount(){
      this.retrieveAvailablePosts();
    }

    onRefresh(){
      this.setState({refreshing:true});
      this.retrieveAvailablePosts().then(()=> {
        this.setState({refreshing:false});
      })
    }


    render() {

      return (
        <Container>
          <Content
            refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
            colors={['red']}
            />}
          >

              {this.state.data}

          </Content>
          <View>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: 'rgb(0, 51, 153)' }}
              position="bottomRight"
              onPress={() => {this.findButton()}}>
              <Icon name="search" />
            </Fab>
          </View>
        </Container>


        );
      }
    }

    module.exports = Available;

    AppRegistry.registerComponent('Available', () => Available);
