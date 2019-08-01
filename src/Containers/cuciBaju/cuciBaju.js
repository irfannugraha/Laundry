import React, { Component } from 'react';
import { ListView, Text, ScrollView, View} from 'react-native';
import firebase from 'firebase';
import styles from './cuciBajuStyles';
import Input from '../../Components/Input/Input';
import DropDown from '../../Components/Drop down/DropDown';
import Button from '../../Components/Button/Button';
import LoginUser from '../LoginUser/LoginUser';
import { TouchableHighlight } from 'react-native-gesture-handler';
import propTypes from 'prop-types';

export default class cuciBaju extends Component{

  static navigationOptions = {  
    title: 'Cuci Baju',
    
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTitleStyle: {
      color: 'orange',
      textAlign: 'center',
      flex: 1,
    },
  }

  static propTypes = {
    onValueChange: propTypes.func,
  };
  static defaultProps = {
    onValueChange: () => 'null',
  }

  constructor() {
    super();
    console.ignoredYellowBox = ['Setting a timer'];
    this.state = {
      email: 'koko@gmail.com',
      pass: 'kokoko',
      error: 'null',
      uid: '',
      user: ['kosong'],
      loading: false,

      nama: '',
      alamat: '',
      no_hp: '',
      parfum: '',
      jenis_layanan: '',
      lama_pengiriman: '',
      keterangan: '',
      tanggal_pencucian: '',

      layananData: [
        'Diantar', 'Ambil Sendiri'
      ],
      durasiData: [
        '1 hari', '2 hari', '3 hari', '4 hari'
      ],
      parfumData: [
        'Dark Temptation', 'Gold Temptation', 'Black', 'Anarchy', 'Twist', 'Apollo', 'Signature Intense', 'Signature Mysterious', 'Signature Rogue'
      ]

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

    const user = firebase.auth().currentUser;
    this.setState({uid: user.uid});
  }

  submit() {
    const { nama, alamat, no_hp, parfum, jenis_layanan, lama_pengiriman, keterangan } = this.state;
    this.setState({ error: '', loading: true });

    if(nama== '' || nama== '' || alamat== '' || no_hp== '' || parfum== '' || jenis_layanan== '' || lama_pengiriman== '' || keterangan== '' )
    {
      alert('lengkapi dokumen');
    }else{
      const newUser = firebase.database().ref().child('user/' + this.state.uid + '/pesan').push();

      newUser.set({
        nama: nama,
        alamat: alamat, 
        no_hp: no_hp,
        parfum: parfum,
        jenis_layanan: jenis_layanan,
        lama_pengiriman: lama_pengiriman,
        keterangan: keterangan,
        tanggal_pencucian: new Date().toLocaleString(),
      });
      this.props.navigation.navigate('driverBrangkat');
      this.setState({
        nama: '',
        alamat: '',
        no_hp: '',
        parfum: '',
        jenis_layanan: '',
        lama_pengiriman: '',
        keterangan: '',
      })
    }
    this.setState({ error: '', loading: false });
  }

  render() {
    const { buttonContainerStyle, inputStyle, containerChild, container } = styles;

    return (
      <View style={{flex: 1}}>
        <ScrollView style={container}>
          <View style={containerChild}>
            <Input moreStyle={inputStyle}
              maxLength={50} 
              placeholder={'Nama'} 
              label={'Nama'}
              value={this.state.nama}
              onChangeText={(nama) => this.setState({nama})}
              />
            <Input moreStyle={inputStyle} 
              maxLength={200} 
              placeholder={'Alamat'} 
              label={'Alamat'} 
              multiline={true}
              value={this.state.alamat}
              onChangeText={(alamat) => this.setState({alamat})}
            />
            <Input moreStyle={inputStyle} 
              maxLength={200} 
              placeholder={'Nomor Hp'} 
              label={'Nomor HP'} 
              value={this.state.no_hp} 
              onChangeText={(no_hp) => this.setState({no_hp})}
            />
          </View>
          <View style={containerChild}>
            <DropDown moreStyle={inputStyle} 
              data={this.state.layananData} 
              placeholder={'Jenis Layanan'} 
              label={'Jenis Layanan'}
              placeHolder={'jenis layanan'}
              selectedValue={this.state.jenis_layanan}
              onValueChange={(item) => this.setState({jenis_layanan: item})}
            />  
            <DropDown moreStyle={inputStyle} 
              data={this.state.durasiData} 
              placeholder={'Lama Pengiriman'} 
              label={'Lama Pengiriman'}
              placeHolder={'Lama Pengiriman'}
              selectedValue={this.state.lama_pengiriman}
              onValueChange={(item) => this.setState({lama_pengiriman: item})}
            />
            <DropDown moreStyle={inputStyle} 
              data={this.state.parfumData} 
              placeholder={'Parfum'} 
              label={'Parfumn'}
              placeHolder={'Parfumn'}
              selectedValue={this.state.parfum}
              onValueChange={(item) => this.setState({parfum: item})}
            />
          </View>
          <View style={containerChild}>
            <Input moreStyle={inputStyle} 
              maxLength={200} 
              placeholder={'Keterangan'} 
              label={'Keterangan'} 
              multiline={true}
              value={this.state.keterangan}
              onChangeText={(keterangan) => this.setState({keterangan})}  
            />
          </View>
        </ScrollView>
        <View style={buttonContainerStyle}>
          <Button onPress={ () => this.submit() } 
            label={"SUBMIT"}
          /> 
        </View>
      </View>
    );
  }
}