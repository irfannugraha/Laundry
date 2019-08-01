import React, { Component } from 'react';
import { Text, ScrollView, View} from 'react-native';
import styles from './notaPembayaranStyles';
import Input from '../../Components/Input/Input';
import DropDown from '../../Components/Drop down/DropDown';
import Button from '../../Components/Button/Button';
import Paragraph from '../../Components/Paragraph/Paragraph';

class notaPembayaran extends Component{

  static navigationOptions = {  
    title: 'Cuci Baju',
    
    headerStyle: {
      backgroundColor: 'orange',
    },
    headerTitleStyle: {
      color: 'white',
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

  pindahPembayaran() {
    ;
  }

  render() {
    const { buttonContainerStyle, textStyle, containerChild, container } = styles;

    return (
      <View style={{flex: 1}}>
        <Paragraph moreStyle={{flex: 2}} />
        <View style={{flex: 1}}>
          <Text style={[textStyle, {fontSize: 70, color: 'orange'}]}>
            Terimakasih
          </Text>
          <Text style={[textStyle, {fontSize: 30}]}>
            Telah Memakai Jasa Kami
          </Text>
        </View>
        <Button moreStyle={{height: 70}} label='Tentang Kami' />
      </View>
    );
  }
}

export default notaPembayaran;