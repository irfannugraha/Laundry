import React, { Component } from 'react';
import {Animated, Text, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import Style from './InputStyle';

export default class Input extends Component{

  constructor() {
      super()
      this.state = {
          Value: new Animated.Value(5),
      }
  }

  muncul() {
    Animated.timing(this.state.Value, {
      toValue: 1,
      duration: 500,
    }).start();
    Animated.timing(this.state.Value, {
      toValue: 5,
      duration: 500,
    }).start();
  }

  render(){
    const { onChangeText, value, label, placeholder, multiline, maxLength, moreStyle } = this.props;
    const { styleContainerChild, styleText, styleContainer, styleInput } = Style;

    return (
      <View style={[styleContainer, moreStyle]}>
        <Animated.View style={[styleContainerChild, {
            opacity: this.state.Value,
            bottom: this.state.Value,
          }]}>
          <Text style={[styleText]}>{label}</Text>
        </Animated.View>
        <TextInput 
          style={styleInput}
          placeholder={placeholder}
          multiline= {multiline}
          maxLength={maxLength}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    )
  }
}

Input.defaultProps = {
  multiline: false,
  moreStyle: null,
  label: null,
  value: null
};

Input.propTypes = {
  maxLength: PropTypes.number.isRequired,
  onChangeText: PropTypes.func.isRequired,
}