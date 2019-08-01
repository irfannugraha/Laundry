import React, { Component } from 'react';
import { Animated, Easing, Text, ScrollView, View} from 'react-native';
import styles from './driverBrangkatStyle';
import Input from '../../Components/Input/Input';
import DropDown from '../../Components/Drop down/DropDown';
import Button from '../../Components/Button/Button';
import Paragraph from '../../Components/Paragraph/Paragraph';

class tungguKonfirmasi extends Component{

  static navigationOptions = {  
    title: 'Cuci Baju',

    header: null,
  }

  constructor() {
    super()
    console.ignoredYellowBox = ['Setting a timer'];
    this.state = {
      animateValue1: new Animated.Value(0),
      animateValue2: new Animated.Value(0),
      animateValue3: new Animated.Value(0),
      animateValue4: new Animated.Value(0),
    }
  }

  animate() {
    const easingIn= Easing.elastic(1.5);
    const easingOut= Easing.back(2);

    const createAnimate = function(Value, easing, toValue, delay = 0){
      return Animated.timing( Value, {
        toValue,
        duration: 500,
        delay,
        easing,
      })
    }

    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          createAnimate(this.state.animateValue1, easingIn, 15),
          createAnimate(this.state.animateValue2, easingIn, 15, 150),
          createAnimate(this.state.animateValue3, easingIn, 15, 300),
          createAnimate(this.state.animateValue4, easingIn, 15, 450),
        ]),
        Animated.delay(500),
        Animated.parallel([
          createAnimate(this.state.animateValue1, easingOut, 0),
          createAnimate(this.state.animateValue2, easingOut, 0, 150),
          createAnimate(this.state.animateValue3, easingOut, 0, 300),
          createAnimate(this.state.animateValue4, easingOut, 0, 450),
        ])
      ]),
    ).start();

  }

  componentDidMount() {
    this.animate();
  }

  render() {
    const { textStyle, containerChild, loading, loadingContainer, loadingContainerChild } = styles;

    return (
      <View style={{flex: 1}}>
        <View style={containerChild}>
          <Text style={textStyle}>
            Driver kami sedang menuju lokasi anda
          </Text>
        </View>
        <View style={loadingContainer}>
          <View style={loadingContainerChild}>
            <Animated.View style={[loading, {
              width: this.state.animateValue1,
              height: this.state.animateValue1,
            }]} />
          </View> 
          <View style={loadingContainerChild}>
            <Animated.View style={[loading, {
              width: this.state.animateValue2,
              height: this.state.animateValue2,
            }]} /> 
          </View>
          <View style={loadingContainerChild}>
            <Animated.View style={[loading, {
              width: this.state.animateValue3,
              height: this.state.animateValue3,
            }]} />
          </View>
          <View style={loadingContainerChild}>
            <Animated.View style={[loading, {
              width: this.state.animateValue4,
              height: this.state.animateValue4,
            }]} />
          </View>          
        </View>
        <Button moreStyle={{height: 70}} label='Home' />
      </View>
    );
  }
}

export default tungguKonfirmasi;