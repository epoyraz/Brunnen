import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';

export default class InfoStack extends Component {

  constructor() {
    super()
    this.state = {
        screenWidth: Dimensions.get("window").width
    };
}

  render() {
    const imageHeight = Math.floor(this.state.screenWidth);

    return (
      
<ScrollView>
      <View style={styles.rowview}>
        <Image style={{width: 100 + '%', height: imageHeight }} source={{ uri: "https://www.suedtirolerland.it/images/cms/100x100/1309185237D_IMG_6024_Brunnen_dreiQuellen.JPG" }}></Image>
        <View style={styles.borderview}>
        <Text style={styles.nameText}>Chatou de la Fleur</Text>
        <View style={styles.columnview}>
        <Text style={styles.baujahrText}>1875</Text>
        <Text style={styles.wasserText}>Quellwasser</Text>
        <Text style={styles.abstandText}>530m</Text>
        </View>
        <Text style={styles.artikelText}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</Text>
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