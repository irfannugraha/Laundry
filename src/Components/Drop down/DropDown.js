import React, { Component } from 'react';
import {Image, Picker, View} from 'react-native';
import PropTypes from 'prop-types';
import Style from './DropDownStyle';

export default class DropDown extends Component{

  render(){
    const { selectedValue, onValueChange, data, iconSource, placeholder, moreStyle } = this.props;
    const { iconStyle, pickerStyle, containerStyle,  } = Style;

    return (
      <View style={[containerStyle, moreStyle]}>
        <Image
          style={iconStyle}
          tintColor='black'
          source={iconSource}
        />
        <Picker
          style={pickerStyle}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        >
          <Picker.Item color={'grey'} label={'Pilih ' + placeholder}/>
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
  iconSource: require('../../icon/default.png'),
};