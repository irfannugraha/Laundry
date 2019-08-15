import React, { Component } from 'react';
import firebase from 'firebase';

export default class Fire extends Component{
    
    constructor(){
      firebase.initializeApp({
        apiKey: "AIzaSyBnN2dJVRucHmMuyV4MPybhehTR7vo4_74",
        authDomain: "laundry-69.firebaseapp.com",
        databaseURL: "https://laundry-69.firebaseio.com",
        projectId: "laundry-69",
        storageBucket: "",
        messagingSenderId: "80891738612",
        appId: "1:80891738612:web:e852eac34519ce37"
      });

      super();
        this.state = {
          bio: {
            nama: "",
            alamat: "",
            noHp: "",
            poin: "",
            status: "",
            loggedIn: "",
          },
          coba: "hayo",
        }
    }

    setData(){
      firebase.database().ref('user/'+ firebase.auth().currentUser.uid + "/bio").once('value', snapshot => {
        const data = [];
        Object.keys(snapshot.val()).forEach(item => data.push(snapshot.val()[item]));
        // this.state = boi = {
        //     nama: data[1],
        //     alamat: data[0],
        //     noHp: data[2],
        //     poin: data[3],
        //     status: data[4],
        // }
        alert(data[4]);
        this.setState({
          bio: {
            nama: data[1],
            alamat: data[0],
            noHp: data[2],
            poin: data[3],
            status: data[4],
          }
        })
      });
    }

    coba(){
      alert(this.state.bio.nama);
    }
}