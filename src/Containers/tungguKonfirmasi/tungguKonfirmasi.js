import React, { Component } from 'react';
import { Text, ScrollView, View} from 'react-native';
import styles from './tungguKonfirmasiStyle';
import Button from '../../Components/Button/Button';
import firebase from 'firebase';

class tungguKonfirmasi extends Component{

  static navigationOptions = {  
    header: null,
  }

  constructor() {
    super()
    this.state = {

    }
  }

  componentDidMount(){
    firebase.database().ref('user/' + firebase.auth().currentUser.uid + '/bio/status').update({ket: 'konfirmasi'})
  }

  render() {
    const { buttonStyle, textStyle, containerChild } = styles;

    return (
      <View style={{flex: 1}}>
        <View style={containerChild}>
          <Text style={[textStyle, {fontSize: 70, color: '#2EC5CB'}]}>
            Terimakasih
          </Text>
          <Text style={[textStyle, {fontSize: 25}]}>
            Silahkan tunggu pakaian anda selesai
          </Text>
        </View>
        <Button 
          moreStyle={buttonStyle} 
          label='Home' 
          onPress={() => this.props.navigation.navigate('landingPage')}
        />
      </View>
    );
  }
}

export default tungguKonfirmasi;