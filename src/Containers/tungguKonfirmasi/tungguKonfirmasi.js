import React, { Component } from 'react';
import { Text, ScrollView, View} from 'react-native';
import styles from './tungguKonfirmasiStyle';
import Input from '../../Components/Input/Input';
import DropDown from '../../Components/Drop down/DropDown';
import Button from '../../Components/Button/Button';
import Paragraph from '../../Components/Paragraph/Paragraph';

class tungguKonfirmasi extends Component{

  static navigationOptions = {  
    title: 'Cuci Baju',
    
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTitleStyle: {
      color: 'orange',
      textAlign: 'center',
      flex: 1,
    },
  }

  constructor() {
    super()
    this.state = {
      pembayaran: [
        'Mandiri m-banking',
        'OVO',
        'Hutang',
      ],
    }
  }

  render() {
    const { textStyle, containerChild } = styles;

    return (
      <View style={{flex: 1}}>
        <View style={containerChild}>
          <Text style={[textStyle, {fontSize: 70, color: 'orange'}]}>
            Terimakasih
          </Text>
          <Text style={[textStyle, {fontSize: 25}]}>
            Silahkan tunggu konfirmasi dari kami
          </Text>
        </View>
        <Button moreStyle={{height: 70}} label='Home' />
      </View>
    );
  }
}

export default tungguKonfirmasi;