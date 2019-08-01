import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './metodePembayaranStyles';
import DropDown from '../../Components/Drop down/DropDown';
import Button from '../../Components/Button/Button';
import Paragraph from '../../Components/Paragraph/Paragraph';

class metodePembayaran extends Component{

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

  render() {
    const { dropDownStyle } = styles;

    return (
      <View style={{flex: 1}}>
        <DropDown 
          moreStyle={dropDownStyle}
          placeHolder='Metode Pembayaran'
          data={this.state.pembayaran}
        />
        <Paragraph moreStyle={{flex: 1, borderWidth: 0}} />
        <Button moreStyle={{height: 70}} label='BAYAR' />
      </View>
    );
  }
}

export default metodePembayaran;