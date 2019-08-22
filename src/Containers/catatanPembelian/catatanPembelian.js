import React, { Component } from 'react';
import { FlatList, TouchableOpacity, Text, View} from 'react-native';
import styles from './catatanPembelianStyle';
import firebase from 'firebase';
import Loader from '../../Components/LoadingScreen/loading';

export default class login extends Component{

  static navigationOptions = {  
    title: 'RIWAYAT PENCUCIAN',
  }

  constructor() {
    super();
    this.state = {
      item:[{}],
      index: [],
      statusId: '',

      loading: true,
    }
  }
  
  componentDidMount() {
    firebase.database().ref('user/'+ firebase.auth().currentUser.uid + '/pesan').once('value', snapshoot => {
      const data = []
      if (snapshoot.val()) {
        Object.keys(snapshoot.val()).forEach(item => data.push(snapshoot.val()[item]));
        this.setState({item: data,})
  
        for (var index = 0; index < this.state.item.length; index++) {
          this.state.index.push({key: index.toString()});
        };        
      }
      this.setState({loading: false});
    });
    firebase.database().ref('user/' + firebase.auth().currentUser.uid + '/bio').once('value', snapshoot => {
      this.setState({statusId: snapshoot.val().status.idActive})
    })
  }

  renderItem = ({item}) => {
    const { itemConstructor, itemChildConstructor, itemTglContainer} = styles;

    const data = this.state.item;
    const tgl = data[item.key].tanggal_masuk.split(' ');
    let disabled = false;

    if ( data[item.key].id == this.state.statusId ) {
      disabled = true;
    }
    
    return(
      <View>
        <TouchableOpacity style={itemConstructor}
          onPress={() => this.props.navigation.navigate('notaPembayaran', {id: data[item.key].id})}
          disabled={disabled}
        >
          <View style={itemTglContainer}>
              <Text style={{fontSize: 35, marginTop: -8}}>
                {tgl[0]}
              </Text>
              <Text style={{fontSize: 20, marginTop: -10}}>
                {tgl[1]}
              </Text>
          </View>
            {data[item.key].id == this.state.statusId ? 
              <View style={itemChildConstructor}>
                <Text style={{fontSize: 15, color: 'red'}}>
                  Laundry sedang diproses
                </Text>
              </View>
            :
              <View style={itemChildConstructor}>
                <Text style={{fontSize: 20}}>
                  {'Rp. ' + data[item.key].harga.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                </Text>
                <Text style={{fontSize: 15, color: 'dimgrey'}}>
                  {data[item.key].berat + 'kg'}
                </Text>
              </View>
            }
          <View style={[itemChildConstructor, {alignItems: 'flex-end', borderStartWidth: 0,}]}>
              <Text style={{fontSize: 15, color: 'dimgrey'}}>
                {data[item.key].id }
              </Text>
              <Text>
                {" "}
              </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { container } = styles;
    if (this.state.loading == true) {
      return(
        <Loader/>
      )
    }else{
      return (
        <View style={container}>
          <FlatList
            data={this.state.index}
            renderItem={this.renderItem}
          />
        </View>
      );
    }
  }
}