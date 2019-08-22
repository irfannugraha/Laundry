import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import style from './SwitchesStyle';
import PropTypes from 'prop-types';

export default class Switches extends Component {

  constructor() {
    super()
    this.state = {
      x: new Animated.Value(0),
      val: '',
    }
  }

  static propsTypes = {
    onValueChange: PropTypes.func
  };

  static defaultProps = {
    onValueChange: () => null
  };

  componentDidMount() {
    const {firstLabel} = this.props;
    this.setState({val: firstLabel});
  };
  
  
  Mount(value) {
    const { firstLabel, secondLabel, onValueChange } = this.props;

    if(this.state.val == firstLabel){
      Animated.timing(this.state.x, {
        toValue: value,
        duration: 300,
      }).start();
      this.setState(
        {val: secondLabel}, 
        () => onValueChange(secondLabel)
      );
    }else if(this.state.val == secondLabel){
      Animated.timing(this.state.x, {
        toValue: 0,
        duration: 300,
      }).start();
      this.setState(
        {val: firstLabel},
        () => onValueChange(firstLabel)
      );
    }
  }
  
  render() {
    const { container, switchStyle, firstContainer, seccondContainer, fontStyle } = style;
    const { firstLabel, secondLabel } = this.props;
    const containerWidth= (Dimensions.get('window').width)-20;
    const b =(containerWidth/2);
    const a = (containerWidth-b);

    return (
      <TouchableWithoutFeedback 
        onPress={() => this.Mount(b)
      }>
        <View style={[container, {
          width: containerWidth,
          height: '100%',
        }]}>
          <Animated.View style={[switchStyle, {
            width: (containerWidth/2),
            height: '100%',
            transform: [{translateX: this.state.x}] } 
          ]}>
          </Animated.View>
          <View style={seccondContainer}>
            <View style={firstContainer}>
              <Text style={[fontStyle, {
                color: this.state.val == firstLabel ?
                  '#2EC5CB'
                :
                  'white'
              }]}>
              {firstLabel}
              </Text>
            </View>
            <View style={firstContainer}>
              <Text style={[fontStyle, {
                color: this.state.val == firstLabel ?
                  'white'
                :
                  '#2EC5CB'
              }]}>
              {secondLabel}
              </Text>
            </View>
          </View>
        </View> 
      </TouchableWithoutFeedback>
    );
  }
}

Switches.defaultProps = {
  containerWidth: 100,
  firstLabel: 'ON',
  secondLabel: 'OFF',
};