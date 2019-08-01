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

export default class fire extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      number: '',
      numbers: [],
      message: '',
      messages: [],
    }

    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    firebase.database().ref(). ("user").on("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initMessages = [];
          Object.keys(data).forEach(message => initMessages.push(data[message]));
          this.setState({
            messages: initMessages
          })
        }
      });
  }

  addItem () {
    if (!this.state.number) return;

    const newNumber = firebase.database().ref().child("pesan/numba").push();
    newNumber.set(this.state.number, () => this.setState({number: ''}))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.msgBox}>
          <TextInput placeholder='Enter your message'
            value={this.state.message}
            onChangeText={(text) => this.setState({message: text})}
            style={styles.txtInput}/>
        </View>

        <View style={styles.msgBox}>
          <TextInput placeholder='Enter your number'
            value={this.state.number}
            onChangeText={(text) => this.setState({number: text})}
            style={styles.txtInput}/>
        </View>

        <Button title='Send' onPress={this.addItem}/>
        <Button title='Delete' onPress={this.deleteItem}/>

        <Text>
          {this.state.messages[1]}
        </Text>
        {/* <FlatList data={this.state.messages}
          renderItem={
            ({item}) => 
            <View style={styles.listItemContainer}>
              <Text style={styles.listItem}>
                {item}
              </Text>
            </View>
          }
          /> */}
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