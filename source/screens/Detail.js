import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';

export default class Detail extends Component {
  constructor() {
    super()
    this.state = {
        screenWidth: Dimensions.get("window").width,
    };
}

  render() {
    const imageHeight = Math.floor(this.state.screenWidth);
    const { navigation } = this.props;
    var item = navigation.getParam('info', 'NO-ID');
    console.log(item);

    return (
      
<ScrollView>
      <View style={styles.rowview}>
        <Image style={{width: 100 + '%', height: imageHeight }} source={{ uri: "https://www.suedtirolerland.it/images/cms/100x100/1309185237D_IMG_6024_Brunnen_dreiQuellen.JPG" }}></Image>
        <View style={styles.borderview}>
        <Text style={styles.nameText}>{item.properties.bezeichnung}</Text>
        <View style={styles.columnview}>
        <Text style={styles.baujahrText}>{item.properties.historisches_baujahr}</Text>
        <Text style={styles.wasserText}>{item.properties.wasserart_txt}</Text>
        <Text style={styles.abstandText}>{item.geometry.distance}</Text>
        </View>
        <Text style={styles.artikelText}>{item.properties.text}</Text>
        </View>
        </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  itemText: {
    flex: 1,
  },
  abstandText: {
    color: '#9E9E9E',
    fontFamily: 'fira-sans-light',
    fontSize: 20,
  },
  nameText: {
    fontFamily: 'fira-sans-bold',
    fontSize: 30,
    color: '#313131',
    alignSelf: 'center',
  },
  artikelText: {
    fontFamily: 'fira-sans-regular',
    fontSize: 20,
    color: '#313131',
    marginTop: 15,
    marginLeft: 5 +'%',
    marginRight: 5 +'%'
  },
  baujahrText: {
    fontFamily: 'fira-sans-light',
    fontSize: 20,
    color: '#313131'

  },
  wasserText: {
    fontFamily: 'fira-sans-light',
    fontSize: 20,
    color: '#FF9100'
  },
  rowview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  columnview: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginLeft: 5 +'%',
    marginRight: 5 +'%'
  },
  borderview: {
    borderTopWidth: 2,
    borderTopColor: '#FF9100'
  },
});