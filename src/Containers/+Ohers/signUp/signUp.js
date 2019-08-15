import React, { Component } from 'react';
import { YellowBox, Text, View} from 'react-native';
import firebase from 'firebase';
import styles from './signUpStyle';
import Input from '../../../Components/Input/Input';
import Button from '../../../Components/Button/Button';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class login extends Component{

  static navigationOptions = {  
    header: null,
  }

  constructor() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    super();
    this.state = {
      nama: '',
      email: '',
      noHp: '',
      alamat: '',
      password: '',
      loading: false,
    }
  }
  
  onSignUpSuccess() {
    const {nama, noHp, alamat} = this.state;

    this.setState({loading: false})
    var ref = firebase.database().ref('user/'+ firebase.auth().currentUser.uid +'/bio');
    ref.set({
      nama: nama,
      noHp: noHp,
      alamat: alamat,
      point: 0,
    })
    this.props.navigation.navigate('landingPage');
  }

  onSignUp() {
    const {email, password} = this.state;

    this.setState({ error: '', loading: true });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => 
        this.onSignUpSuccess()
      )
      .catch(
        error => alert(error.message),
        this.setState({loading: false}),
      )
  }

  render() {
    const { buttonStyle, inputStyle, container, containerChild, textContainerStyle, textStyle } = styles;
    if (this.state.loading == true) {
      return( <Loader/> )
    }else{
      return (
        <View style={container}>
          <View style={containerChild}>
            <Input moreStyle={inputStyle} 
              placeholder={'Nama'}
              iconSource={require('../../../icon/user.png')}
              value={this.state.nama}
              onChangeText={(nama) => this.setState({nama})}
            />
            <Input moreStyle={inputStyle} 
              placeholder={'Email'}
              iconSource={require('../../../icon/email.png')}
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}
            />
            <Input moreStyle={inputStyle} 
              placeholder={'No Telphone'}
              iconSource={require('../../../icon/telephone.png')}
              value={this.state.noHp}
              onChangeText={(noHp) => this.setState({noHp})}
            />
            <Input moreStyle={inputStyle} 
              placeholder={'Alamat'}
              iconSource={require('../../../icon/pin.png')}
              value={this.state.alamat}
              onChangeText={(alamat) => this.setState({alamat})}
            />          
            <Input moreStyle={inputStyle} 
              placeholder={'Password'}
              iconSource={require('../../../icon/key.png')}
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
            />
          </View>
          <View style={{flex: 1}}>
            <Button moreStyle={buttonStyle}
                onPress={() => this.onSignUp()}
                label={'BUAT AKUN'}
            />
            <View style={textContainerStyle}>
              <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('login')}
              >
                <Text style={[textStyle, {}]}>
                  Atau login sekarang
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}