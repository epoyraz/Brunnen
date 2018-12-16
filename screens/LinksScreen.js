import React from 'react';
import { MapView } from 'expo';
var data = require('../data/brunnen.json');

export default class LinksScreen extends React.Component {
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 47.3621895,
          longitude: 8.5331945,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      {data.features.map((feature, index) => {
     const coords = {
         latitude: feature.geometry.coordinates[1],
         longitude: feature.geometry.coordinates[0],
     };

     const metadata = 'Brunnen';

     return (
         <MapView.Marker
            key={index}
            coordinate={coords}
            title="Brunnenname"
            description={metadata}
         />
     );
  })}
      </MapView>
    );
  }
}