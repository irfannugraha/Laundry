import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './metodePembayaranStyles';
import DropDown from '../../Components/Drop down/DropDown';
import Button from '../../Components/Button/Button';
import Paragraph from '../../Components/Paragraph/Paragraph';

class metodePembayaran extends Component{

  static navigationOptions = {  
    title: 'Pilih metode pembayaran',
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
    const { buttonStyle, dropDownStyle } = styles;

    return (
      <View style={{flex: 1}}>
        <DropDown 
          moreStyle={dropDownStyle}
          data={this.state.pembayaran}
          placeholder={'Metode Pembayaran'} 
          selectedValue={this.state.jenis_layanan}
          onValueChange={(item) => this.setState({jenis_layanan: item})}
        />
        <Paragraph moreStyle={{flex: 1, borderWidth: 0}} />
        <Button 
          moreStyle={buttonStyle} 
          label='BAYAR' 
          onPress={() => this.props.navigation.navigate('tungguKonfirmasi')}
        />
      </View>
    );
  }
}

export default metodePembayaran;