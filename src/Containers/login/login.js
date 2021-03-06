import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View} from 'react-native';
import firebase from 'firebase';
import styles from './loginStyle';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

export default class login extends Component{

  static navigationOptions = {  
    header: null,
  }

  constructor() {
    super();
    this.state = {
      error: '',
      email: '',
      password: '',
    }
  }

  onLoginSuccess() {
    this.setState({ email: '', password: '', loading: false });
  }

  onLogin() {
    const {email, password} = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.onLoginSuccess())
      .catch(
        error => alert(error.message),
        this.setState({loading: false}),
      )
  }

  ubahPass() {
    var email = this.state.email;
    if (email == '') {
      alert('Mohon masukan email');
    }else{
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        alert('Kami telah mengirim tautan untuk mengatur ulang kata sandi ke ' + email)
      }).catch(() => {
        alert('Mohon masukan email dengan benar')
      })
    }
  }

  render() {
    const { logoStyle, buttonStyle, inputStyle, containerChild, textContainerStyle, textStyle, forgotpassStyle } = styles;
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
          <View style={logoStyle}>
            <Image
              style={{height: '100%', width: '100%', tintColor: 'white'}}
              source={require('../../icon/tshirt.png')}
            />
          </View>
        </View>
        <View style={containerChild}>
          <View style={{flex: 9}}>
            <Input moreStyle={inputStyle}
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}
              iconSource={require('../../icon/user.png')}
              keyboardType={'email-address'}
            />
            <Input moreStyle={inputStyle} 
              placeholder={'Password'}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
              iconSource={require('../../icon/key.png')}
            />
            <Button moreStyle={buttonStyle}
                onPress={() => this.onLogin()}
                label={'LOGIN'}
            />
            <View style={textContainerStyle}>
              <Text style={textStyle}>
                {'Belum memiliki akun?  '}
              </Text>
              <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('signUp')}
              >
                <Text style={[textStyle, {borderBottomWidth: 1}]}>
                  Buat akun sekarang
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={forgotpassStyle}>
            <TouchableOpacity
              onPress={() => this.ubahPass()}
            >
              <Text style={{alignSelf: 'center', borderBottomWidth: 1}}>
                Lupa password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}