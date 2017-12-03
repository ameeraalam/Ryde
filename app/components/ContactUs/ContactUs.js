import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Text, Button, Center, Footer, FooterTab, Body, Content, Card, CardItem, Grid, Row, Col, Item, Input, Label } from "native-base";
import { Actions } from "react-native-router-flux";
import styles from './Styles';

class ContactUs extends Component {

  previousPage() {
    Actions.pop({});
  }


  render() {
    return (
      <Container>

          <Content style={{backgroundColor:'#fff'}}>
            <View style={{ marginTop:30, paddingLeft:15}}>
              <Text style={{fontSize: 40, fontFamily: 'sans-serif', color: 'rgb(0, 51, 153)'}}>
                Contact Us
              </Text>
            </View>

            <View style={{marginTop: 7, paddingLeft:15}}>
              <Text style={{fontSize: 15, fontFamily: 'sans-serif', color: 'rgb(0, 51, 153)'}}>
                Please contact us using this form below
              </Text>

              <View style={{marginTop:40, paddingRight:15}}>

                  <Item floatingLabel>
                    <Label> Name </Label>
            			  <Input
                    underlineColorAndroid = "transparent"
            			  />
            			</Item>

                  <Item floatingLabel>
                    <Label> Email </Label>
                    <Input
                    underlineColorAndroid = "transparent"
                    />
                  </Item>

                  <Item floatingLabel>
                    <Label> Message </Label>
                    <Input
                    underlineColorAndroid = "transparent"
                    />
                  </Item>

                  <TouchableOpacity onPress = {() => {}}>
          					<Text style = {{backgroundColor:'rgb(0, 51, 153)', textAlign:'center', height:54, color:'#fff', fontSize:18, paddingTop:14, marginTop:25, fontFamily: 'sans-serif'}}>
                      Submit
                    </Text>
          				</TouchableOpacity>
              </View>
            </View>
          </Content>

        </Container>
    );
  }

}

module.exports = ContactUs;

AppRegistry.registerComponent('ContactUs', () => ContactUs);
