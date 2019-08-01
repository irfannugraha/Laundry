import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as firebase from 'firebase';

export default class LoginUser extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      email: 'koko@gmail.com',
      pass: 'kokoko',
      error: 'null',
      uid: 'null',
      pesan: '',
      user: ['kosong'],

      width: Dimensions.get('window').width,
    }
  }

  componentDidMount() {
    const {
      email= this.state.email,
      password= this.state.pass,
    } = this.state;

    const config = {
      apiKey: "AIzaSyBnN2dJVRucHmMuyV4MPybhehTR7vo4_74",
      authDomain: "laundry-69.firebaseapp.com",
      databaseURL: "https://laundry-69.firebaseio.com",
      projectId: "laundry-69",
      storageBucket: "",
      messagingSenderId: "80891738612",
      appId: "1:80891738612:web:e852eac34519ce37"
    };
    firebase.initializeApp(config);

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }
  
  onLoginFail() {
    this.setState({ error: 'Log In Failed', loading: false });
  }
  
  onLoginSuccess() {
    this.setState({ error: 'Log In Sukses', loading: false });
    this.makeUser();
  }

  makeUser() {
    const user = firebase.auth().currentUser;
    this.setState({uid: user.uid});

    const newUser = firebase.database().ref().child('user/' + this.state.uid + '/pesan').push();
    newUser.set({
      email: this.state.email,
      user: this.state.pass,
    });
    
    firebase.database().ref().child('user/'+ this.state.uid +'/pesan').on('value', snapshoot => {
      const data = snapshoot.val();
      if (snapshoot.val()) {
        const initUser = [];
        Object.keys(data).forEach(pesan => initUser.push(data[pesan]));
        this.setState({user: initUser});
      }else{
        this.setState({user: ['key gagal']})
      }
    })
  }

  render() {
    return (
      <View style={{
        width: this.state.width,
        height: 50,
        backgroundColor: 'blue',
      }}>
        <Text>
          {this.state.width}
        </Text>
      </View>
    );
  }
}