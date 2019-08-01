import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as firebase from 'firebase';

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

export default class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      email: 'koko@gmail.com',
      pass: 'kokoko',
      error: 'null',
      uid: 'null',
      pesan: '',
      user: ['kosong'],
    }
  }

  componentDidMount() {
    const {
      email= this.state.email,
      password= this.state.pass,
    } = this.state;

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
    const usre = this.state.user;

    return (
      <View style={styles.container}>
        <Text>
          {this.state.error}
        </Text>
        <Text style={{fontSize: 50}}>
          {this.state.user[2]}
        </Text>
        {/* {this.state.user.map((item, index) => (
          <Text key={index}>
            {item}
          </Text>
        ))} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    //marginTop: Constants.statusBarHeight
  },
  msgBox: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff'
  },
  txtInput: {
    flex: 1
  },
  listItemContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5
  },
  listItem: {
    fontSize: 20,
    padding: 10
  }
});