import React, { Component } from 'react';
import {Animated, Text, ScrollView, View} from 'react-native';
import Style from './ParagraphStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Paragraph extends Component{

  constructor() {
      super()
      this.state = {
          Value: new Animated.Value(5),
      }
  }

  render(){
    const { label, moreStyle } = this.props;
    const { styleContainer, textStytle } = Style;

    return (
      <View style={[styleContainer, moreStyle]}>
        <ScrollView>
          <Text style={textStytle}>
            {label}
          </Text>
        </ScrollView>
      </View>
    )
  }
}

Paragraph.defaultProps = {
  label: 'im a text'
};