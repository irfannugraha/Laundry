import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, Animated, Image, YellowBox, Alert, View, Text, Easing } from 'react-native';
import firebase from 'firebase';
import Button from '../../Components/Button/Button';
import Spinner from '../../Components/LoadingScreen/loading';
import LoginForm from '../login/login';
import styles from './landingPageStyle';

class LandingPage extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    super();
    this.state = { 
      loggedIn: null,

      val: true,
      widthAnim: new Animated.Value(235 - 45),
      borderAnim: new Animated.Value(0),

      user: {},
      harga: 0,
      berat: 0,
      data: [
        {
          judul: 'Gratis ongkos kirim untuk bulan mei',
          uri: 'https://firebasestorage.googleapis.com/v0/b/laundry-69.appspot.com/o/images%2Fimage%20url.jpg?alt=media&token=906b02f0-4bcf-4120-8592-eb83b6efb401',
          poin: 1,
        },
        {
          judul: 'Cashback hingga 50%',
          uri: 'https://cashbac.com/blog/wp-content/uploads/2018/08/Pesta-Cashbac-Ceria-Family-Mart-Blog-759x500.jpg',
          poin: 2,
        },
        {
          judul: 'Diskon 50%',
          uri: 'https://firebasestorage.googleapis.com/v0/b/laundry-69.appspot.com/o/images%2F50%25%20off.jpg?alt=media&token=b2509ed3-0573-4d35-9152-0dcba6e63173',
          poin: 5,
        },
      ],
    };

  }

  componentDidMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBnN2dJVRucHmMuyV4MPybhehTR7vo4_74",
      authDomain: "laundry-69.firebaseapp.com",
      databaseURL: "https://laundry-69.firebaseio.com",
      projectId: "laundry-69",
      storageBucket: "",
      messagingSenderId: "80891738612",
      appId: "1:80891738612:web:e852eac34519ce37"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var auth = firebase.database().ref('user/'+ firebase.auth().currentUser.uid);
        auth.child("/bio").on('value', snapshot => {
          const data = [];
          Object.keys(snapshot.val()).forEach(item => data.push(snapshot.val()[item]));
          this.setState({
            user: {
              nama: data[1],
              alamat: data[0],
              noHp: data[2],
              poin: data[3],
              status: data[4],
            },
            loggedIn: true
          })
          firebase.database().ref('user/'+ firebase.auth().currentUser.uid + '/pesan').orderByChild('id').equalTo(this.state.user.status.idActive).on('child_added', snapshot => {
            this.setState({
              harga: snapshot.val().harga,
              berat: snapshot.val().berat,
            })
          });
        });

      } else {
        this.setState({ loggedIn: false });
      }
    });
  } 

  anim(panjang) {
    if(this.state.val){
      Animated.parallel([
        Animated.timing(this.state.widthAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.quad)
        }),
        Animated.timing(this.state.borderAnim, {
          toValue: 10,
          duration: 500,
          easing: Easing.out(Easing.quad)
        })
      ]).start();
      this.setState({val: false});
    }else{
      Animated.parallel([
        Animated.timing(this.state.widthAnim, {
          toValue: panjang - 45,
          duration: 500,
          easing: Easing.out(Easing.quad)
        }),
        Animated.timing(this.state.borderAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.quad)
        })
      ]).start();
      this.setState({val: true});
    }
  }

  renderHeader() {
    const {bioContainerChild, headerButtonStyle, containerButtonStyle} = styles;
    const panjang = 235;
    return(
      <View style={bioContainerChild}>
          <Animated.View style={{alignItems: 'center',
            width: 125,
            paddingHorizontal: 10,
            flex: 1, 
            flexDirection: 'row',}}
          >
              <TouchableOpacity onPress={() => this.props.navigation.navigate('editProfile')}>
                <Image style={{borderRadius: 1000,
                  width: 50, height: 50, marginEnd: 10,
                  }}
                  source={{uri: 'https://firebasestorage.googleapis.com/v0/b/laundry-69.appspot.com/o/images%2Fblank-profile-picture-973460_960_720.png?alt=media&token=06bffb17-ecb4-43e6-b2e9-672f984e801d'}}
                />
              </TouchableOpacity>
              <View>
                <Text style={{fontSize: 20}}>
                  {this.state.user.nama}
                </Text>
                <Text style={{fontSize: 15, color: 'dimgray'}}>
                  {'Poin '} {this.state.user.poin}
                </Text>
              </View>
          </Animated.View>
        <Animated.View style={{alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 10,
          width: panjang,
          height: '100%',
          flexDirection: 'row',
          elevation: this.state.borderAnim,
          transform: [{translateX: this.state.widthAnim}]}}
        >
          <TouchableOpacity onPress={() => this.anim(panjang)}>
            <Image style={{width: 25, height: 25}}
              source={require('../../icon/menu.png')}
            />
          </TouchableOpacity>
          <View style={{flex: 1, 
              height: '100%', 
              flexDirection: 'row', 
              justifyContent: 'flex-end'}}
          >
              <View style={containerButtonStyle}>              
                <TouchableOpacity onPress={() => alert('Mohon maaf, dalam masa pembangunn')}>
                  <Image style={headerButtonStyle}
                    source={require('../../icon/coupon.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={containerButtonStyle}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('catatanPembelian')}>
                  <Image style={headerButtonStyle}
                    source={require('../../icon/note.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={containerButtonStyle}>
                <TouchableOpacity onPress={() => alert('Mohon maaf, dalam masa pembangunan')}>
                  <Image style={headerButtonStyle}
                    source={require('../../icon/question.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={[containerButtonStyle, {paddingEnd: 0}]}>
                <TouchableOpacity onPress={() => Alert.alert(
                  'Logout', 'Apakah anda yakin untuk logout', 
                  [{text: 'Ya', onPress: () => firebase.auth().signOut()}, {text: 'Tidak'}])}
                >
                  <Image style={headerButtonStyle}
                    source={require('../../icon/logout.png')}
                  />
                </TouchableOpacity>
              </View>
          </View>
        </Animated.View>
      </View>
    )
  }

  renderStatus(ket) {
    switch(ket) {
      case 'driver':        
        return(
          <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 20}}>
              Driver kami sedang menuju lokasi anda
            </Text>
          </View>
        )
      case 'driverSampai':
          return(
            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
              <Text style={{fontSize: 20}}>
                Driver anda telah sampai
              </Text>
            </View>
          )
      case 'bayar':
        return(
          <View style={{flex: 1}}>
            <Text style={{fontSize: 20}}>
              Laundry anda : 
            </Text>
            <View style={{flex: 1, 
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
                <Text style={{flex: 1, fontSize: 18}}>
                  {'Total '}
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>
                    {'Rp ' + this.state.harga.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") }
                  </Text>
                </Text>
                <Text style={{flex: 1, fontSize: 18}}>
                  {'Berat '}
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>
                    {this.state.berat + " Kg"}
                  </Text>
                </Text>
            </View>
            <Button 
              moreStyle={{height: 50, borderRadius: 100,}}
              onPress={() => this.props.navigation.navigate('pembayaran')}
              label={'BAYAR'}
            />
          </View>
        )
      case 'konfirmasi':
        return(
          <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 50}}>
              Terimakasih
            </Text>
            <Text style={{fontSize: 20}}>
              Silahkan tunggu pakaian anda
            </Text>
          </View>
        )
      case 'selesai':
        return(
          <View style={{flex: 1}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontSize: 40, color: 'black'}}>
                Terimakasih
              </Text>
              <Text style={{fontSize: 20}}>
                Pakaian anda telah selesai
              </Text>
            </View>
            <Button 
              moreStyle={{height: 50, borderRadius: 100,}}
              onPress={() => this.props.navigation.navigate('notaPembayaran', {id: this.state.user.status.idActive})}
              label={'Detail'}
            />
          </View>
        )
      default:
        return(
          <View style={{flex: 1}}>
            <Text style={{flex: 1, 
              fontSize: 20, 
              alignSelf: 'center', 
              textAlignVertical: 'center'}}
            >
              Tidak ada pesanan yang berlangsung
            </Text>
            <Button 
              moreStyle={{height: 50, borderRadius: 100,}}
              onPress={() => this.props.navigation.navigate('cuciBaju')}
              label={'Pesan Sekarang'}
            />                    
          </View>
        )
    }
  }

  renderPromo(data) {
    const { promoContainerStyle, promoChildContainerStyle } = styles;
    return(
      <View style={{flex: 1, flexDirection: 'row'}}>
        <ScrollView horizontal={true}>
          {data.map((item, index) => (
            <TouchableOpacity key={index} style={promoContainerStyle}>
                <View style={{flex: 1,}}>
                  <Image source={{uri: item.uri}}
                    resizeMode={'cover'}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <View style={[promoChildContainerStyle]}>
                    <Text style={{flex: 2, 
                      fontSize: 20,
                      alignSelf: 'center'}}>
                        {item.judul}
                    </Text>
                    <View style={{alignItems: "flex-end", flex: 1}}>
                      <Text style={{flex: 1,
                        fontSize: 20,
                        textAlignVertical: 'center',
                        color: 'darkorange',
                        fontWeight: 'bold'}}>
                          {item.poin} POIN
                      </Text>
                    </View>
                </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            style={[promoContainerStyle, 
              {justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 0,}]}>
                <Image
                  source={require('../../icon/right-arrow.png')}
                  style={{width: 40, height: 40, marginBottom: 10}}
                />
                <Text style={{fontSize: 20}}>
                  Lihat Semua
                </Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
    )    
  }

  render() {
    const { statusContainerStyle, containerStyle } = styles;

    if(this.state.loggedIn == false){
      return <LoginForm {...this.props} />
    }else if (this.state.loggedIn == true) {
      return (
        <View style={{flex: 1}}>
            {this.renderHeader()}
            <View style={containerStyle}>
                <View style={{flex: 2,}}>
                    <Text style={{fontSize: 20,
                      fontWeight: '600',
                      marginTop: 20}}>
                        Status pesanan anda
                    </Text>
                    <View style={[statusContainerStyle, {flex: 1}]}>
                      {this.renderStatus(this.state.user.status.ket)}
                    </View>
                </View>
                <View style={{flex: 3, marginTop: 15}}>
                      <TouchableOpacity style={{height: 50, 
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                          <Text style={{flex: 1, 
                            fontSize: 20,
                            alignSelf: 'center',
                            fontWeight: '600'}}>
                              Tukarkan POIN anda
                          </Text>
                          <View style={{alignItems: "flex-end",
                            justifyContent: 'center',
                            flex: 1}}>
                            <Image
                              source={require('../../icon/right-arrow.png')}
                              tintColor='black'
                              style={{height: 20, width: 20, borderWidth: 10,}}
                            />                              
                          </View>
                      </TouchableOpacity>
                      {this.renderPromo(this.state.data)}
                </View>
            </View>
        </View>
        );        
    }
    else{
      return (
        <View style={styles.container}>
          <Spinner/>
        </View>
      );
    }
  }
}

export default LandingPage;
