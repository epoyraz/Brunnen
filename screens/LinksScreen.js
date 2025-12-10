import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
const data = require('../data/brunnen.json');

export default function LinksScreen() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Map View</Text>
        <Text style={styles.description}>
          Map view is available on iOS and Android.
        </Text>
        <Text style={styles.subtitle}>Fountain Locations:</Text>
        <ScrollView style={styles.listContainer}>
          {data.features.slice(0, 10).map((feature, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemTitle}>
                {feature.properties.bezeichnung || 'Brunnen'}
              </Text>
              <Text style={styles.itemCoords}>
                Lat: {feature.geometry.coordinates[1].toFixed(4)},
                Lon: {feature.geometry.coordinates[0].toFixed(4)}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  // For mobile platforms, you would use react-native-maps here
  // This is a placeholder for now
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map View</Text>
      <Text style={styles.description}>
        Map functionality requires react-native-maps to be installed.
      </Text>
    </View>
  );
}

LinksScreen.navigationOptions = {
  title: 'Map',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#313131',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#6ACCFF',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  listContainer: {
    marginTop: 10,
  },
  item: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#6ACCFF',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#313131',
  },
  itemCoords: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
