import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import mapMarker from '../images/map-marker.png'

const screens: React.FC = () => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -27.8143599,
          longitude: -50.3172257,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
        <Marker
          calloutAnchor={{
            x: 2.7,
            y: 0.8
          }}
          icon={mapMarker}
          coordinate={{
            latitude: -27.8143599,
            longitude: -50.3172257
          }}
        >
          <Callout tooltip onPress={() => navigate('OrphanageDetails')}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>casa das prima</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>

        <TouchableOpacity
          onPress={() => { }}
          style={styles.createOrphanageButton}
          activeOpacity={0.8}
        >
          <Feather name="plus" size={20} color='#fff' />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: "center",
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3
  },

  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default screens;