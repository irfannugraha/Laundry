import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './pembayaranStyles';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Paragraph from '../../Components/Paragraph/Paragraph';
import Table from '../../Components/Tabel/Tabel';
import Switches from  '../../Components/Switches/Switches';

class pembayaran extends Component{

  static navigationOptions = {  
    title: 'Pembayaran',
    
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
      cara_pembayaran: 'CASH',
      coupon: '',
      label: [
        "1. Kemeja Panjang (5)",
        "2. Kemeja Pendek (4)",
        "3. Jaket (10)",
        "4. Kaos (1)",
        "5. Celana Panjang (100)",
        "6. Celana Pendek (5)",
        "7. Kerudung (0)",
        "8. Handuk (1)",
        "9. Sperai (1)",
        "10. Selimut (5)"
      ],
      duit: 50000,
      totalKg: '10',
    }
  }

  onPress() {
    if(this.state.cara_pembayaran == 'TRANSFER'){
      this.props.navigation.navigate('metodePembayaran'); 
    }
    else if(this.state.cara_pembayaran == 'CASH'){
      alert('MOHON MAAF!! dalam pembangunan');
    }else{
      alert('GOBLO');
    }
  }

  render() {
    const { buttonStyle, containerChildStyle, textStyle, inputStyle } = styles;

    return (
      <View style={{flex: 1}}>
        <Table
          moreStyle={{flex: 2, borderWidth: 1, borderColor: 'gainsboro'}}
        />
        <View style={{flex: 1}}>
          <View style={{height: 40, alignItems: 'center'}}>
            <Switches 
              onValueChange={(text) => this.setState({cara_pembayaran: text})}
              firstLabel='CASH'
              secondLabel='TRANSFER'
            />
          </View>
          <View>
            <Input 
              moreStyle={inputStyle}
              maxLength={5} 
              placeholder={'Your Coupon Here'}
              value={this.state.coupon}
              onChangeText={(coupon) => this.setState({coupon})}
            />
          </View>
        </View>
        <View style={containerChildStyle}>
          <View style={textStyle}>
            <Text style={{fontSize: 20}}>
              {'Rp '}
              <Text>
                {this.state.duit.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") }
                {' / '}
                <Text style={{color: 'orange', fontSize: 15}}>
                  {this.state.totalKg + 'kg'}
                </Text>
              </Text>
            </Text>
          </View>
          <Button 
            label='BAYAR'
            moreStyle={buttonStyle}
            onPress={ () => this.onPress() } 
          />
        </View>    
      </View>
    );
  }
}

export default pembayaran;