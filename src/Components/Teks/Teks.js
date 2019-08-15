import React, { Component } from 'react';
import { Text, View} from 'react-native';
import Style from './TeksStyle';

export default class Teks extends Component{

  constructor() {
      super()
  }

  render(){
    const { value, label, moreStyle, } = this.props;
    const { labelStyle, styleContainer, ketStyle } = Style;
    
    return (
      <View style={[styleContainer, moreStyle]}>
        <Text style={labelStyle}>
          {label + ' : '}
        </Text>
        <View style={ketStyle}>
          <Text style={{fontSize: 17}}>
            {value}
          </Text>
        </View>
      </View>
    )
  }
}

Teks.defaultProps = {
  label: 'label',
  value: 'keterangan',
};