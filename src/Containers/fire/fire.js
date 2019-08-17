import React, { Component } from 'react';
import { View} from 'react-native';

export default class fire extends Component{

  componentDidMount() {
    const passing = this.props.navigation.getParam('passing', 'null');
    alert(passing);
  }

  render() {
    return (
      <View>
        
      </View>
    );
  }

}