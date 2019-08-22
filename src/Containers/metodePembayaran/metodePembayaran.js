import React, { Component } from 'react';
import { Clipboard, Text, View } from 'react-native';
import styles from './metodePembayaranStyles';
import DropDown from '../../Components/Drop down/DropDown';
import Button from '../../Components/Button/Button';
import Input from '../../Components/Input/Input';
import Teks from '../../Components/Teks/Teks';
import { TouchableOpacity } from 'react-native-gesture-handler';

class metodePembayaran extends Component{

  static navigationOptions = {  
    title: 'Pembayaran Transfer',
  }

  constructor() {
    super()
    this.state = {
      bank: '',
      pilihanBank: [
        'Bank BCA', 
        'Bank Mandiri',
        'Bank BNI',
        'Bank BRI',
        'Bank BSM',
      ],
      noRek: '',
    }
  }

  setRek(item) {
    this.setState({bank: item});
    switch (item) {
      case 'Bank BCA':
        this.setState({noRek: '731 025 2577'});
        break;
      case 'Bank Mandiri':
        this.setState({noRek: '0700 000 799 882'});
        break;
      case 'Bank BNI':
        this.setState({noRek: '023 872 2880'});
        break;
      case 'Bank BRI':
        this.setState({noRek: '034 101 000 745 300'});
        break;
      case 'Bank BSM':
        this.setState({noRek: '778 788 0877'});
        break;
      default:
        this.setState({noRek: ''});
        break;
    }
  }

  onPress() {
    if((this.state.noRek == '') || (this.state.nama == '')){
      alert('Lengkapi dokumen')
    }
    else{
      this.props.navigation.navigate('tungguKonfirmasi')
    }
  }

  render() {
    const { containerStyle, pemisahStyle, labelStyle, inputStyle, buttonStyle } = styles;
    return (
      <View style={{flex: 1}}>
        <View style={pemisahStyle}>
          <View style={containerStyle}>
            <Text style={labelStyle}>
              Nama pemilik rekening
            </Text>
            <Input moreStyle={inputStyle}
              maxLength={100} 
              placeholder={'Nama'} 
              label={'Nama'}
              value={this.state.nama}
              onChangeText={(nama) => this.setState({nama})}
            />
          </View>
          <View style={containerStyle}>
            <Text style={labelStyle}>
              Bank tujuan
            </Text>
            <DropDown 
              moreStyle={inputStyle}
              data={this.state.pilihanBank}
              placeholder={'Bank Tujuan'} 
              selectedValue={this.state.bank}
              onValueChange={(item) => {this.setRek(item)}}
            />
          </View>
        </View>
        <View style={{flex: 1, marginTop: 20, marginHorizontal: 20}}>
          <Teks moreStyle={{marginBottom: 10}}
            label={'No Rekening'}
            value={this.state.noRek}
          />
          {this.state.noRek ?
            <TouchableOpacity style={{marginBottom: 10, justifyContent: 'flex-end'}}
              onPress={() => Clipboard.setString(this.state.noRek)}
            >
              <Text style={{color: '#2EC5CB', alignSelf: 'flex-end'}}>
                Salin no rekening
              </Text>
            </TouchableOpacity>
            :
            null
          }
          <Text style={{fontSize: 15}}>
            Pembayaran dapat dilakukan ke rekening  
            <Text style={{fontWeight: 'bold'}}>
              {' a/n Laundryku'}
            </Text>
          </Text>          
          <Text style={{fontSize: 15, marginTop: 5}}>
            Laundryku akan melakukan verifikasi paling lama 60 menit setelah anda melakukan pembayaran.
          </Text>
        </View>
        <Button 
          moreStyle={buttonStyle} 
          label='BAYAR' 
          onPress={() => this.onPress()}
        />
      </View>
    );
  }
}

export default metodePembayaran;