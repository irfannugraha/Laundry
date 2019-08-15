import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './pembayaranStyles';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import firebase from 'firebase';
import Table from '../../Components/Tabel/Tabel';
import Switches from  '../../Components/Switches/Switches';

class pembayaran extends Component{

  static navigationOptions = {  
    title: 'Pembayaran',
  }

  constructor() {
    super()
    this.state = {
      cara_pembayaran: 'CASH',
      coupon: '',
      jumlah: [''],
      harga: 0,
      berat: 0,
    }
  }

  componentDidMount(){
    let val;
    firebase.database().ref('user/' + firebase.auth().currentUser.uid + '/bio/status/idActive').on('value', snapshot => {
      val = snapshot.val();
    })

    firebase.database().ref('user/'+ firebase.auth().currentUser.uid + '/pesan').orderByChild('id').equalTo( val ).once('child_added', snapshot => {
      const data = snapshot.val().pakaian;
      const init = []
      Object.keys(data).forEach(item => init.push(data[item]));
      this.setState({
        harga: snapshot.val().harga,
        berat: snapshot.val().berat,
        jumlah: init,
      })
    });
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
          data={this.state.jumlah}
          moreStyle={{height: 250, borderWidth: 1, borderColor: 'gainsboro'}}
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
                {this.state.harga.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") }
                {' / '} 
                <Text style={{color: 'orange', fontSize: 15}}>
                  {this.state.berat + 'kg'}
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