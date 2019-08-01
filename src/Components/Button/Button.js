import React, { Component } from 'react';
import {Animated, Text, View} from 'react-native';
import Style from './ButtonStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Button extends Component{

  constructor() {
      super()
      this.state = {
          Value: new Animated.Value(5),
      }
  }

  render(){
    const { onPress, label, moreStyle } = this.props;
    const { styleContainer, textStytle, containerChildStyle } = Style;

    return (
      <View style={[styleContainer, moreStyle]}>
        <TouchableOpacity 
          style={containerChildStyle}
          onPress={onPress}
        >
          <Text style={textStytle} >
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Button.defaultProps = {
  label: 'Press me'
};