import React, { Component } from 'react';
import {Image, TextInput, View} from 'react-native';
import Style from './InputStyle';

export default class Input extends Component{

  constructor() {
      super()
  }

  render(){
    const { keyboardType, editable, secureTextEntry, iconSource, onChangeText, value, placeholder, multiline, maxLength, moreStyle, } = this.props;
    const { iconStyle, styleContainer, styleInput } = Style;
    
    return (
      <View style={[styleContainer, moreStyle]}>
        {iconSource ? 
          <Image
            style={iconStyle}
            tintColor='black'
            source={iconSource}
          />
          :
          null
        }
        <TextInput 
          style={styleInput}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          maxLength={maxLength}
          multiline= {multiline}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          keyboardType={keyboardType}
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
  iconSource: null,
};