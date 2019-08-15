import React, { Component } from 'react';
import { Text, ScrollView, View} from 'react-native';
import firebase from 'firebase';
import styles from './notaPembayaranStyles';
import Button from '../../Components/Button/Button';
import Table from '../../Components/Tabel/Tabel';
import Teks from '../../Components/Teks/Teks';
import Loader from '../../Components/LoadingScreen/loading';

class notaPembayaran extends Component{

  static navigationOptions = {  
    header: null,
  }

  constructor() {
    super()
    this.state = {
      jumlah: [],
      pesan: {},
      promo: null,
      loading: true,
      user: firebase.database().ref('user/' + firebase.auth().currentUser.uid),
    }
  }

  componentDidMount() {
    const {user} = this.state;
    let val;
    user.child('/bio/status/idActive').on('value', snapshot => {
      val = snapshot.val();
    })

    user.child('/pesan').orderByChild('id').equalTo( val ).once('child_added', snapshot => {
      const data = snapshot.val();
      const init = [];
      Object.keys(data.pakaian).forEach(item => init.push(data.pakaian[item]));
      this.setState({
        jumlah: init,
        pesan: data,
        loading: false,
      })
    });
  }

  backHome() {
    this.state.user.child('/bio').update({
      status: {
        idActive: 0,
        ket: "kosong",
      }
    })
    this.props.navigation.navigate('landingPage');
  }

  render() {
    const { inputStyle, containerStyle, pemisahStyle } = styles;
    
    if (this.state.loading) {
      return(
        <Loader/>
      )
    }else{
      return (
        <View style={{flex: 1}}>
          <View
            style={{height: 70,
              borderBottomWidth: 5,
              borderBottomColor: 'lightgray',
              padding: 20,}}
          >
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text style={{fontSize: 17}}>
                  {this.state.pesan.tanggal_masuk}
                  {/* <Text>
                    {" - "}
                  </Text>
                  {this.state.pesan.tanggal_keluar} */}
                </Text>
                <Text>
                  Id pesanan : {this.state.pesan.id}
                </Text>
            </View>
          </View>
          <ScrollView style={{flex: 1, paddingTop: 15}}>
              <View style={containerStyle}>
                  <View style={pemisahStyle}>
                    <Teks moreStyle={inputStyle}
                      label={'Nama'}
                      value={this.state.pesan.nama}
                    />
                    <Teks moreStyle={inputStyle}
                      label={'Alamat'}
                      value={this.state.pesan.alamat}
                    />
                    <Teks moreStyle={inputStyle}
                      label={'Telephone'}
                      value={this.state.pesan.no_hp}
                    />
                  </View>

                  <View style={pemisahStyle}>
                    <Teks moreStyle={inputStyle}
                      label={'Tanggal masuk'}
                      value={this.state.pesan.tanggal_masuk}
                    />
                    <Teks moreStyle={inputStyle}
                      label={'Tanggal keluar'}
                      value={this.state.pesan.tanggal_keluar}
                    />
                  </View>

                  <View style={pemisahStyle}>
                    <Teks moreStyle={inputStyle}
                      label={'Total berat'}
                      value={this.state.pesan.berat + " Kg"}
                    />
                    <Teks moreStyle={inputStyle}
                      label={'Total harga'}
                      value={"Rp. " + this.state.pesan.harga}
                    />
                    {this.state.promo == null? 
                      null
                      :
                      <Teks moreStyle={inputStyle}
                        label={'Diskon promo'}
                        value={"Rp. " + this.state.pesan.harga}
                      />
                    }
                  </View>

                  <View style={pemisahStyle}>
                    <Teks moreStyle={inputStyle}
                      label={'Jenis layanan'}
                      value={this.state.pesan.jenis_layanan}
                    />
                    <Teks moreStyle={inputStyle}
                      label={'Durasi pencucian'}
                      value={this.state.pesan.lama_pengiriman}
                    />
                    <Teks moreStyle={inputStyle}
                      label={'Parfum'}
                      value={this.state.pesan.parfum}
                    />
                    <Teks moreStyle={inputStyle}
                      label={'Keterangan'}
                      value={this.state.pesan.keterangan == " " ?
                          this.state.pesan.keterangan
                        :
                          "kosong"
                      }
                    />
                  </View>
              </View>
              <Teks moreStyle={inputStyle}
                label={'Detail pakaian'}
                value={""}
              />
              <Table
                data={this.state.jumlah}
                moreStyle={{height: 250, }}
              />
          </ScrollView>
          <Button moreStyle={{height: 50}}
            onPress={() => this.backHome()}
            label='Home' />
        </View>
      );
    }
  }
}

export default notaPembayaran;