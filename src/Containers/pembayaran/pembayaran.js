import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './pembayaranStyles';
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
      this.props.navigation.navigate('tungguKonfirmasi');
    }else{
      alert('GOBLO');
    }
  }

  render() {
    const { buttonStyle, containerChildStyle, textStyle, } = styles;

    return (
      <View style={{flex: 1}}>
        <Text style={{fontSize: 20, marginStart: 15, marginTop: 15}}>
          Pakaian anda 
        </Text>
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
        </View>
        <View style={containerChildStyle}>
          <View style={textStyle}>
            <Text style={{fontSize: 20}}>
              {'Rp '}
              <Text>
                {this.state.harga.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") }
                {' / '} 
                <Text style={{color: '#2EC5CB', fontSize: 18}}>
                  {this.state.berat + ' kg'}
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