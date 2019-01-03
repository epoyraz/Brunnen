import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';

var data = require('../../data/brunnen.json');
var geodist = require("geodist");

class Brunnen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      features: data.features,
      fontLoaded: false,
    };
  }

  roundToSeven(num) {
    return +(Math.round(num + "e+7") + "e-7");
  }

  roundToOne(num) {
    return +(Math.round(num + "e+1") + "e-1");
  }

  sortByDistance(array) {
    return array.sort(function (a, b) {
      var x = a.geometry.distance; var y = b.geometry.distance;
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  calculatedistances(cLat, cLon, coordinates) {
    coordinates.forEach(coordinate => {
      var aLon = this.roundToSeven(coordinate.geometry.coordinates[0]);
      var aLat = this.roundToSeven(coordinate.geometry.coordinates[1]);
      var dist = geodist(
        { lat: cLat, lon: cLon },
        { lat: aLat, lon: aLon },
        { exact: true, unit: 'meters' }
      );
      var dist = this.roundToOne(dist);
      coordinate.geometry.distance = dist;
    });
    var sorted = this.sortByDistance(coordinates);
    return sorted;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: 47.3694147,                                                          //position.coords.latitude,
          longitude: 8.4914816,                                                            //position.coords.longitude,
          error: null,
        });
        this.state.features = this.calculatedistances(this.state.latitude, this.state.longitude, data.features);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  elementClicked= (item) => {
    this.props.navigation.push('detail', {info : item})
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          </View>
          <FlatList
            data={data.features}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            renderItem={({ item }) =>

              <View style={styles.container}>
                <TouchableOpacity onPress={() => this.elementClicked(item)}>
                  <View style={styles.flatview}>
                    <Image style={styles.itemImage}
                      source={{ uri: "https://www.suedtirolerland.it/images/cms/100x100/1309185237D_IMG_6024_Brunnen_dreiQuellen.JPG" }}>
                    </Image>
                    <View style={styles.itemText} >
                      <Text numberOfLines={2} style={styles.nameText}>{item.properties.bezeichnung ? item.properties.bezeichnung : 'Brunnen'}</Text>
                      <Text style={styles.baujahrText}>{item.properties.historisches_baujahr ? item.properties.historisches_baujahr : 'Baujahr unbekannt'}</Text>
                      <Text style={[styles.wasserText, item.properties.wasserart_txt == 'Verteilnetz' ? styles.verteilernetzText : styles.quellwasserText]}>
                        {item.properties.wasserart_txt}
                      </Text>
                    </View>
                    <Text style={styles.abstandText}>{item.geometry.distance} m</Text>
                  </View>
                </TouchableOpacity>
              </View>
            }
            keyExtractor={item => item.properties.objectid.toString()} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  itemImage: {
    width: 100,
    height: 100,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
  itemText: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10
  },
  iImage: {
    width: 30,
    height: 30,
    tintColor: '#313131',
    marginRight: 10,
    maxWidth: 10
  },
  abstandText: {
    color: '#9E9E9E',
    fontFamily: 'fira-sans-light',
    fontSize: 15,
    marginRight: 15,
    marginTop: 50
  },
  nameText: {
    fontFamily: 'fira-sans-bold',
    fontSize: 18,
    color: '#313131'

  },
  baujahrText: {
    fontFamily: 'fira-sans-light',
    fontSize: 15,
    color: '#313131'

  },
  wasserText: {
    fontFamily: 'fira-sans-light',
    fontSize: 15,

  },
  verteilernetzText: {
    color: '#FF9100'
  },
  quellwasserText: {
    color: '#199BFF'
  },
  tempNav: {
    width: 100 + '%',
    height: 74,
    backgroundColor: '#6ACCFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flatview: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 6,
    borderWidth: 0.75,
    borderColor: '#FF8000',
    marginTop: 15,
    marginLeft: 5 + '%',
    marginRight: 5 + '%'
  },
});

export default Brunnen;