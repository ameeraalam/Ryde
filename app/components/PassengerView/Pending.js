import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Pending extends Component {
  render() {
    return (
      <View>
        <Text>
         Hello World from Pending!
        </Text>
      </View>
    );
  }
}

module.exports = Pending;

AppRegistry.registerComponent('Pending', () => Pending);