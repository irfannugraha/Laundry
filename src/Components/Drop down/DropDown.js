import React, { Component } from 'react';
import {Animated, Text, Picker, View} from 'react-native';
import PropTypes from 'prop-types';
import Style from './DropDownStyle';

export default class DropDown extends Component{

  constructor(){
    super();
  };

  render(){
    const { selectedValue, onValueChange, data, label, placeHolder, moreStyle } = this.props;
    const { textStyle, pickerStyle, containerStyle,  } = Style;

    return (
      <View style={[containerStyle, moreStyle]}>
        <Text style={textStyle}>{label}</Text>
        <Picker
          style={pickerStyle}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        >
          <Picker.Item color={'grey'} label={'Pilih ' + placeHolder}/>
          {data.map((item, index) => (
            <Picker.Item 
              color={'black'} 
              label={item} 
              value={item} 
              key={index}
            />
          ))}
        </Picker>
      </View>
    )
  }
}

DropDown.defaultProps = {
  data: ['pertama', 'kedua'],
  label: '',
};