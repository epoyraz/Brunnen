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

  sortbydistance(cLat, cLon, coordinates) {
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
    console.log(sorted);
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
        this.state.features = this.sortbydistance(this.state.latitude, this.state.longitude, data.features);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
        <FlatList
          data={this.state.features}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View style={styles.flatview}>
                  <Image 
         source={{uri: "https://www.suedtirolerland.it/images/cms/100x100/1309185237D_IMG_6024_Brunnen_dreiQuellen.JPG"}}
         style={{ width:100, height: 100, margin: 5}}
         >
        </Image>
        <View style={{ flex:1, justifyContent: 'center'}} >
            <Text style= {{fontSize: 18}}>{item.properties.bezeichnung}</Text>
            <Text>{item.properties.historisches_baujahr}</Text>
            <Text>{item.properties.wasserart_txt}</Text>
            <Text>{item.geometry.distance}</Text>
        </View>
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
    flex: 1,
    marginTop: 50,
    backgroundColor: '#F5FCFF',
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatview: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 30,
    borderRadius: 2,
  },
  name: {
    fontSize: 18
  },
  email: {
    color: 'red'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
