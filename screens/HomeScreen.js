import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image
} from 'react-native';
var data = require('../data/brunnen.json');
var geodist = require("geodist");

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      features: data.features,
    };
  }

roundToSeven(num) {    
    return +(Math.round(num + "e+7")  + "e-7");
}

roundToOne(num) {    
  return +(Math.round(num + "e+1")  + "e-1");
}

sortByDistance(array) {
  return array.sort(function(a, b) {
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
        {exact: true, unit: 'meters'}
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
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        console.log(this.state.latitude);
        console.log(this.state.longitude);
        this.state.features = this.calculatedistances(this.state.latitude, this.state.longitude, data.features);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <View style={styles.container}>
            <View >
                <View style={styles.tempNav} >
                    <Text style={styles.hText}>Brunnen</Text>
                    <Image style={styles.hImage} source = {require('../assets/info.png')} />
                </View>
            </View>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      </View>
        <FlatList
          data={data.features}
          showsVerticalScrollIndicator={false}
          initialNumToRender={50}
          maxToRenderPerBatch={200}
          renderItem={({item}) =>
          <View style={styles.flatview}>
                  <Image style={styles.itemImage}
         source={{uri: "https://www.suedtirolerland.it/images/cms/100x100/1309185237D_IMG_6024_Brunnen_dreiQuellen.JPG"}}>
        </Image>
        <View style={styles.itemText} >
            <Text style={styles.nameText}>{item.properties.bezeichnung ? item.properties.bezeichnung : 'Brunnen'}</Text>
            <Text style={styles.baujahrText}>{item.properties.historisches_baujahr ? item.properties.historisches_baujahr : 'Baujahr unbekannt'}</Text>
            <Text style={[styles.wasserText, item.properties.wasserart_txt == 'Verteilnetz'  ? styles.verteilernetzText : styles.quellwasserText]}>
                  {item.properties.wasserart_txt}
            </Text>        
        </View>
        <Text style={styles.abstandText}>{item.geometry.distance}m</Text>
          <Image style={styles.iImage} source = {require('../assets/erweitern.png')} />
          </View>
          }
          keyExtractor={item => item.properties.objectid.toString()}
        />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  itemImage: {
    width:100, 
    height: 100, 
    borderBottomLeftRadius: 20, 
    borderTopLeftRadius: 20
  },
  itemText: {
    flex:1,
    justifyContent: 'center', 
    marginLeft: 10
  },
  hImage: {
    width: 30, 
    height: 30, 
    marginLeft: 25 + '%',
    marginTop: 25
  },
  iImage: {
    width: 30, 
    height: 30, 
    tintColor: '#313131',
    marginRight: 10,
    maxWidth: 10
  },
  hText: {
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 30 + '%',
    color: 'white',
    marginTop: 25,
  },
  abstandText: {
    color: '#9E9E9E',
    fontWeight: 'normal',
    marginRight: 15,
    marginTop: 50
  },
  nameText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#313131'
   
  },
  baujahrText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '200',
    color: '#313131'
   
  },
  wasserText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '100',
 
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
    alignItems:'center',
    flexDirection: 'row',
  },
  flatview: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#6ACCFF',
    marginTop : 15,
    marginLeft: 5 + '%',
    marginRight: 5 + '%'
  },
});
