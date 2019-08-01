import React, { Component } from 'react';
import {Animated, Text, TextInput, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import Style from './RadioButtonStyle';

export default class RadioButton extends Component{

  constructor() {
      super()
      this.state = {
          v: new Animated.Value(8),
          valueReverse: new Animated.Value(1),
          val: true,
          checked: 0,
      }
  }

  clicked(data, index) {
    this.setState({checked: index});
    this.setState({value: data[index]});
  }
  
  animationChecked() {
    if(this.state.val == true){
      Animated.timing(this.state.v, {
        toValue: 1,
        duration: 1000,
      }).start();
    }
    else{
      Animated.timing(this.state.v, {
        toValue: 8,
        duration: 1000,
      }).start();      
      Animated.timing(this.state.valueReverse, {
        toValue: 1,
        duration: 1000,
      }).start();      
      this.setState({val: true});
    }
  }

  render(){
    
    const { data } = this.props;
    const value = data[0];
    const { buttonStyle, labelStyle, styleContainer, touchStyle } = Style;


    return (
      <View style={styleContainer}>
        {data.map((item, index) =>(
          <View key={index}>
            {this.state.checked == index ? 
                <TouchableOpacity 
                  style={touchStyle} 
                >
                  <Animated.View style={[buttonStyle, {borderWidth: this.state.v}]}></Animated.View>
                  <Text style={labelStyle}>{item}</Text>
                </TouchableOpacity>
              :
              <TouchableOpacity 
                style={touchStyle} 
                onPress={() => {
                  this.clicked(data, index)
                }}
              >
                <Animated.View style={[buttonStyle, {borderWidth: this.state.valueReverse}]}></Animated.View>
                <Text style={labelStyle}>{item}</Text>
              </TouchableOpacity> 
            }
          </View>
        ))}
      </View>
    )
  }
}

RadioButton.defaultProps = {
  data: ['pertama', 'kedua'],
};