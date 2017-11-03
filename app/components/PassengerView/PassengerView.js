import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
  TouchableOpacity,
  Image
} from "react-native";
import {Actions } from 'react-native-router-flux';
import { Container, Header, Left, Body, Right, Button, Title, Footer, FooterTab, Content } from 'native-base';
	
  export default class PassengerView extends Component {

    findButton(){

      let resObj = this.props.resObj;
      Actions.rideSearch({resObj});
    }

  render() {
    return (
      
      <View>
      {/*Button to use the findButton function with an image being used for the button*/}
        <TouchableOpacity onPress = {() => {this.findButton()}}>
          <Image
            source = {require("./images/findImage.jpg")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
     text: {
        color: 'white',
        fontSize: 16,
     }
});


module.exports = PassengerView;

AppRegistry.registerComponent("PassengerView", () => PassengerView);
