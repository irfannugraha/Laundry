import React, { Component } from 'react';
import {Image, TextInput, View} from 'react-native';
import Style from './InputStyle';

export default class Input extends Component{

  constructor() {
      super()
  }

  render(){
    const { editable, secureTextEntry, iconSource, onChangeText, value, placeholder, multiline, maxLength, moreStyle, } = this.props;
    const { iconStyle, styleContainer, styleInput } = Style;
    
    return (
      <View style={[styleContainer, moreStyle]}>
        <Image
          style={iconStyle}
          tintColor='black'
          source={iconSource}
        />
        <TextInput 
          style={styleInput}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          maxLength={maxLength}
          multiline= {multiline}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
        />
      </View>
    )
  }
}

Input.defaultProps = {
  onChangeText: null,
  value: null,
  multiline: false,
  moreStyle: null,
  label: null,
  maxLength: null,
  iconSource: require('../../icon/default.png'),
};