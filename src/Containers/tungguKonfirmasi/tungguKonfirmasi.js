import React, { Component } from 'react';
import { Text, ScrollView, View} from 'react-native';
import styles from './tungguKonfirmasiStyle';
import Button from '../../Components/Button/Button';
import firebase from 'firebase';

class tungguKonfirmasi extends Component{

  static navigationOptions = {  
    title: 'Cuci Baju',
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

  componentDidMount(){
    firebase.database().ref('user/' + firebase.auth().currentUser.uid + '/bio/status').update({ket: 'konfirmasi'})
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
        <Button 
          moreStyle={{height: 50}} 
          label='Home' 
          onPress={() => this.props.navigation.navigate('landingPage')}
        />
      </View>
    );
  }
}

export default tungguKonfirmasi;