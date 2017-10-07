import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Available extends Component {
  render() {
    return (
      <View>
        <Text>
         Hello World from Available!
        </Text>
      </View>
    );
  }
}

module.exports = Available;

AppRegistry.registerComponent('Available', () => Available);