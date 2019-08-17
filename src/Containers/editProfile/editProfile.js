import React, { Component } from 'react';
import { TouchableOpacity, Text, Image, ScrollView, View} from 'react-native';
import firebase from 'firebase';
import styles from './editProfileStyle';
import Loader from '../../Components/LoadingScreen/loading';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

export default class cuciBaju extends Component{

  static navigationOptions = {  
    title: 'Ubah Profil',
  }

  constructor() {
    super();
    this.state = {
      user: firebase.database().ref('user/'+ firebase.auth().currentUser.uid),
      loading: false,

      bio: {},
      email: '',
      password: '1234567890',

      pesan: [],

    }
  }

  componentDidMount() {
    this.state.user.child('/bio').once('value', snapshot => {
      this.setState({
        bio: snapshot.val(),
        email: firebase.auth().currentUser.email,
        loading: false,
      })
    })
  }

  ubahPass() {
    var email = this.state.email;
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      alert('Kami telah mengirim tautan untuk mengatur ulang kata sandi ke ' + email)
    })
  }

  submit() {
    const {bio, email} = this.state;
    this.setState({loading: true });
    
    if(bio.nama== '' ||  bio.alamat== '' || bio.no_hp== '' || email== '')
    {
      alert('lengkapi dokumen');
      this.setState({loading: false});
    }else{
      this.state.user.child('/bio').update({
        nama: bio.nama,
        alamat: bio.alamat,
        no_hp: bio.no_hp,
      });
      alert('Profil berhasil diperbarui')
      this.props.navigation.goBack(); 
    }
  }

  render() {
    const { buttonContainerStyle, inputStyle, containerChild, container, pictContainer } = styles;
    if (this.state.loading == true) {
      return(
        <Loader/>
      )
    }else{
      return (
        <View style={{flex: 1}}>
          <ScrollView style={container}>
            <View style={pictContainer}>
              <Image style={{borderRadius: 1000,
                width: 100, height: 100
                }}
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/laundry-69.appspot.com/o/images%2Fblank-profile-picture-973460_960_720.png?alt=media&token=06bffb17-ecb4-43e6-b2e9-672f984e801d'}}
              />
              <TouchableOpacity>
                <Text style={{color: '#5DADE2', 
                    marginTop: 10,
                  }}
                >
                  {"Ganti Foto"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={containerChild}>
              <Input moreStyle={inputStyle} 
                placeholder={'Nama baru'}
                iconSource={require('../../icon/user.png')}
                value={this.state.bio.nama}
                onChangeText={(nama) => this.setState({nama})}
              />
              <Input moreStyle={inputStyle} 
                placeholder={'Email baru'}
                iconSource={require('../../icon/email.png')}
                value={this.state.email}
                editable={false}
                onChangeText={(email) => this.setState({email})}
              />
              <Input moreStyle={inputStyle} 
                placeholder={'No telpon baru'}
                iconSource={require('../../icon/telephone.png')}
                value={this.state.bio.noHp}
                onChangeText={(noHp) => this.setState({noHp})}
              />
              <Input moreStyle={inputStyle} 
                placeholder={'Alamat baru'}
                iconSource={require('../../icon/pin.png')}
                value={this.state.bio.alamat}
                onChangeText={(alamat) => this.setState({alamat})}
              />
              <View style={{borderBottomWidth: 0, 
                marginTop: 20,
                alignItems: 'flex-end',}}
              >
                  <TouchableOpacity
                    onPress={() => this.ubahPass()}
                  >
                    <Text style={{color: 'red', 
                      marginEnd: 20,
                      fontSize: 17,}}
                    >
                      Ubah password
                    </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <Button onPress={ () => this.submit() } 
            label={"UBAH"}
            moreStyle={buttonContainerStyle}
          />
        </View>
      );
    }
  }

}