import React from 'react';
import { MapView } from 'expo';
var data = require('../../data/brunnen.json');

export default class MapStack extends React.Component {
  render() {
    return (
      <MapView
        style={{ flex: 1}}
        initialRegion={{
          latitude: 47.377220,
          longitude: 8.539902,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
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