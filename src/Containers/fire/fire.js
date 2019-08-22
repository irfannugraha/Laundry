import React, { Component } from 'react';
import {YellowBox} from 'react-native';
import firebase from 'firebase';

export default class fire extends Component{

    constructor() {
        YellowBox.ignoreWarnings(['Setting a timer']);
        super();
        this.state = {
            Bio: {},
        }
    }

    menginstal(){
        firebase.initializeApp({
            apiKey: "AIzaSyBnN2dJVRucHmMuyV4MPybhehTR7vo4_74",
            authDomain: "laundry-69.firebaseapp.com",
            databaseURL: "https://laundry-69.firebaseio.com",
            projectId: "laundry-69",
            storageBucket: "",
            messagingSenderId: "80891738612",
            appId: "1:80891738612:web:e852eac34519ce37"
        })
    }

    getBio(){
        firebase.database().ref('user/' + firebase.auth().currentUser.uid + '/bio').on('Value', snapshoot => {
            this.setState({
                Bio : snapshoott.val()
            })
        })
        return this.state.Bio;
    }

}