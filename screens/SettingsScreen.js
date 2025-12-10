import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Brunnen App</Text>
        <Text style={styles.description}>Version 1.0.0</Text>
        <Text style={styles.description}>
          This app helps you find drinking fountains (Brunnen) in Zürich.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          The app shows nearby fountains with their distance from your current location.
          You can view them on a map and see details about each fountain.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Source</Text>
        <Text style={styles.description}>
          Fountain data provided by the City of Zürich open data portal.
        </Text>
      </View>
    </ScrollView>
  );
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#313131',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6ACCFF',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});
