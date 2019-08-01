import React, { Component } from 'react';
import {FlatList, Animated, Text, ScrollView, View} from 'react-native';
import Style from './TabelStyles';

const { styleContainer, styleChildContainer, textStytle, textFlatStytle, flatHeaderStyle, flatHeaderChildStyle, flatContainerChildStyle,  flatContainerStyle } = Style;

export default class Paragraph extends Component{

  constructor() {
      super()
      this.state = {
          header: [{key: 'no'}],
          headerData: [['Jenis Pakaian', 'Jumlah']],

          data: [
            ['celana', 10,],
            ['baju', 5,],
            ['topi', 1,],
            ['kaos kaki', 3,],
            ['celana dalam', 20],
            ['sarung', 20],
            ['celana', 10,],
            ['baju', 5,],
            ['topi', 1,],
            ['kaos kaki', 3,],
            ['celana dalam', 20],
            ['sarung', 20],
          ],
          totalKg: '10',
          harga: '50000',
          item: [],
      }

      for (var index = 0; index < this.state.data.length; index++) {
        this.state.item.push({key: index.toString()});
      }

  }

  renderHeader = ({}) => {
    return(
      <View style={flatHeaderStyle}>
        <View style={[flatHeaderChildStyle, {flex: 0.5}]}>
          <Text style={textFlatStytle}>
            No.
          </Text>
        </View>
        <View style={[flatHeaderChildStyle, {flex: 3.5}]}>
          <Text style={[textFlatStytle, {alignSelf: 'flex-start'}]}>
            Jenis Pakaian
          </Text>
        </View>
        <View style={[flatHeaderChildStyle, {flex: 1}]}>
          <Text style={textFlatStytle}>
            Jumlah
          </Text>
        </View>
      </View>
    )
  }

  renderItem = ({item}) => {
    return (
      <View style={[flatContainerStyle, {
        backgroundColor: ( item.key%2 ) == 0 ?
          'white'
        :
          'whitesmoke'
      }]}>
        <View style={[flatContainerChildStyle, {flex: 0.5}]}>
          <Text style={textFlatStytle}>
            {Number(item.key) + 1}
          </Text>
        </View>
        <View style={[flatContainerChildStyle, {flex: 3.5}]}>
          <Text style={[textFlatStytle, {alignSelf: 'flex-start'}]}>
            {this.state.data[item.key][0]}
          </Text>
        </View>
        <View style={[flatContainerChildStyle, {flex: 1}]}>
          <Text style={textFlatStytle}>
            {this.state.data[item.key][1]}
          </Text>
        </View>
      </View>
    )
  }

  render(){
    const { label, moreStyle } = this.props;

    return (
      <View style={[styleContainer, moreStyle]}>
        <View style={{flex: 1}}>
          <FlatList
            data={this.state.item}
            renderItem={this.renderItem}
            ListHeaderComponent={this.renderHeader}
            stickyHeaderIndices={[0]}
            style={{borderBottomWidth: 1}}
          />
        </View>

      </View>
    )
  }
}

Paragraph.defaultProps = {
  label: 'im a text'
};