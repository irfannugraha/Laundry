import React, { Component } from 'react';
import { ScrollView, View} from 'react-native';
import firebase from 'firebase';
import styles from './cuciBajuStyles';
import Loader from '../../Components/LoadingScreen/loading';
import Input from '../../Components/Input/Input';
import DropDown from '../../Components/Drop down/DropDown';
import Button from '../../Components/Button/Button';


export default class cuciBaju extends Component{

  static navigationOptions = {  
    title: 'Cuci Baju',
  }

  constructor() {
    super();
    this.state = {
      user: firebase.database().ref('user/'+ firebase.auth().currentUser.uid),
      loading: false,

      id: 0,
      nama: '',
      alamat: '',
      no_hp: '',
      parfum: '',
      jenis_layanan: '',
      lama_pengiriman: '',
      keterangan: '',
      tanggal_pencucian: '',
      pesan: [],

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
    this.state.user.child('/bio').once('value', snapshot => {
      const data = snapshot.val()
      this.setState({
        nama: data.nama,
        alamat: data.alamat,
        no_hp: data.noHp,

        loading: false,
      })
    })

    this.state.user.child('/pesan').orderByChild("id").limitToLast(1).once('child_added', snapshot => {
      const data = snapshot.val()
      this.setState({
        id: data.id,

        loading: false,
      })
    })
  }

  tanngalKeluar() {
    const count = this.state.lama_pengiriman.split(' ');
    let day = (parseInt(new Date().getDate()) + parseInt(count[0]));
    let month = new Date().getMonth();
    const listMaxDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const listMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
    if (day > listMaxDay[new Date().getMonth()]) {
      month = (parseInt(new Date().getMonth()) + 1);
      day = day - listMaxDay[new Date().getMonth()];
    }
    const date = day + ' ' + listMonth[month] + ' ' + new Date().getFullYear() + ', ' + new Date().getHours() + ':' + new Date().getMinutes() + ' WIB';
    return date;
  }

  submit() {
    const { nama, alamat, no_hp, parfum, jenis_layanan, lama_pengiriman, keterangan } = this.state;
    this.setState({ error: '', loading: true });

    const list = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
    
    if(nama== '' || nama== '' || alamat== '' || no_hp== '' || parfum== '' || jenis_layanan== '' || lama_pengiriman== '')
    {
      alert('lengkapi dokumen');
      this.setState({loading: false});
    }else{
      this.state.user.child('/pesan').push({
        id: this.state.id+1,
        nama: nama,
        alamat: alamat, 
        no_hp: no_hp,
        parfum: parfum,
        jenis_layanan: jenis_layanan,
        lama_pengiriman: lama_pengiriman,
        keterangan: keterangan,
        tanggal_masuk: new Date().getDate() + ' ' + list[new Date().getMonth()] + ' ' + new Date().getFullYear() + ', ' + new Date().getHours() + ':' + new Date().getMinutes() + ' WIB',
        tanggal_keluar: this.tanngalKeluar(),
        berat: '',
        harga: '',
        pakaian: {
          atasan: 0,
          bawahan: 0,
          footwear: 0,
          headweat: 0,
          underwear: 0,
          lainya: 0,
        }
      });
      this.state.user.child('/bio/status').update({
        idActive: this.state.id+1,
        ket: "driver",
      });
      this.props.navigation.navigate('driverBrangkat'); 
    }
  }

  render() {
    const { buttonStyle, inputStyle, containerChild, container } = styles;
    if (this.state.loading == true) {
      return(
        <Loader/>
      )
    }else{
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
                iconSource={require('../../icon/user.png')}
              />
              <Input moreStyle={inputStyle} 
                maxLength={200} 
                placeholder={'Alamat'} 
                label={'Alamat'} 
                multiline={true}
                value={this.state.alamat}
                onChangeText={(alamat) => this.setState({alamat})}
                iconSource={require('../../icon/pin.png')}
              />
              <Input moreStyle={inputStyle} 
                maxLength={200} 
                placeholder={'Nomor Hp'} 
                label={'Nomor HP'} 
                value={this.state.no_hp} 
                onChangeText={(no_hp) => this.setState({no_hp})}
                iconSource={require('../../icon/telephone.png')}
                keyboardType={'phone-pad'}
              />
            </View>
            <View style={containerChild}>
              <DropDown moreStyle={inputStyle} 
                data={this.state.layananData} 
                placeholder={'Jenis Layanan'} 
                label={'Jenis Layanan'}
                selectedValue={this.state.jenis_layanan}
                onValueChange={(item) => this.setState({jenis_layanan: item})}
                iconSource={require('../../icon/information.png')}
              />  
              <DropDown moreStyle={inputStyle} 
                data={this.state.durasiData} 
                placeholder={'Lama Pengiriman'} 
                label={'Lama Pengiriman'}
                selectedValue={this.state.lama_pengiriman}
                onValueChange={(item) => this.setState({lama_pengiriman: item})}
                iconSource={require('../../icon/calendar.png')}
              />
              <DropDown moreStyle={inputStyle} 
                data={this.state.parfumData} 
                placeholder={'Parfum'} 
                label={'Parfumn'}
                selectedValue={this.state.parfum}
                onValueChange={(item) => this.setState({parfum: item})}
                iconSource={require('../../icon/perfume.png')}
              />
            </View>
            <View style={[containerChild, {borderBottomWidth: 0}]}>
              <Input moreStyle={inputStyle} 
                maxLength={200} 
                placeholder={'Keterangan'} 
                label={'Keterangan'} 
                multiline={true}
                value={this.state.keterangan}
                onChangeText={(keterangan) => this.setState({keterangan})}  
                iconSource={require('../../icon/note.png')}
              />
            </View>
          </ScrollView>
          <Button moreStyle={buttonStyle}
            onPress={ () => this.submit() } 
            label={"SUBMIT"}
          />
        </View>
      );
    }
  }

}