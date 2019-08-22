import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default class loading extends Component{

  render(){
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
        }}>
          <ActivityIndicator size='large'/>
        </View>
      )
  }
}