import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Mapbox, {
  MapView,
  Camera,
  UserLocation,
  ShapeSource,
  SymbolLayer,
  CircleLayer,
  LineLayer,
  Images,
} from '@rnmapbox/maps';

import {featureCollection, point} from '@turf/helpers';
import pin from '../assets/map.png';
import carsData from '../utils/carLocation.json';
import routeResponse from '../utils/routes.json';
import getDirection from './../api/direction';

const accessToken =
  'pk.eyJ1IjoiYWx6aXlhbiIsImEiOiJjbTNoY3A2ZWYwYnluMnhzNnJsNHNtdWI3In0.Y1ol483-L7hCFVfxBlJ56A';
Mapbox.setAccessToken(accessToken);

const SearchPage = ({navigation}) => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [direction, setDirection] = useState();

  // Request location permission
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message:
                'App needs access to your location to show it on the map.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission not granted');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }, []);

  const handleSearch = () => {
    navigation.navigate('HomeScreen', {
      location,
      startDate: startDate.toLocaleString(),
      endDate: endDate.toLocaleString(),
    });
  };

  const points = carsData.map(cars => point([cars.long, cars.lat]));
  const directionCoordinate = direction?.routes[0]?.geometry?.coordinates;
  // console.log('direction data', JSON.stringify(direction));

  const onMapPress = async event => {
    // console.log('event', event);

    try {
      const newDirection = await getDirection(
        [77.28585857878458, 28.56778799090675], // static current location
        [event.coordinates.longitude, event.coordinates.latitude],
      );
      // console.log('new direction', newDirection);
      setDirection(newDirection);
    } catch (e) {
      console.error('some error', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>✨ 100+ cities and counting ✨</Text>
      <Text style={styles.subtitle}>Hey, Ready to hit the road?</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
      />

      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={[styles.datePickerBox, {marginRight: 8}]}
          onPress={() => setShowStartPicker(true)}>
          <Text style={styles.dateText}>
            Trip Start: {startDate.toLocaleString()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.datePickerBox}
          onPress={() => setShowEndPicker(true)}>
          <Text style={styles.dateText}>
            Trip End: {endDate.toLocaleString()}
          </Text>
        </TouchableOpacity>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartPicker(false);
            date && setStartDate(date);
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndPicker(false);
            date && setEndDate(date);
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>SEARCH CAR</Text>
      </TouchableOpacity>

      <MapView
        style={styles.map}
        styleURL="mapbox://styles/mapbox/outdoors-v12">
        <Camera
          followUserLocation={true}
          followZoomLevel={10}
          followUserMode="normal"
        />
        <UserLocation visible={true} showsUserHeadingIndicator={true} />

        <ShapeSource
          id="scooters"
          cluster="true"
          shape={featureCollection(points)}
          onPress={onMapPress}
          style={{
            zIndex: 10000,
          }}>
          <SymbolLayer
            id="symbolLocationSymbols"
            minZoomLevel={1}
            style={{
              iconImage: 'pin',
              iconAllowOverlap: true,
              iconSize: 0.08,
              iconAnchor: 'bottom',
            }}
          />
          <SymbolLayer
            id="pointCount"
            style={{
              textField: ['get', 'point_count'],
              textSize: 16,
              textColor: '#ffffff',
              textPitchAlignment: 'map',
            }}
          />

          <CircleLayer
            id="clusteredScooters"
            belowLayerID="pointCount"
            filter={['has', 'point_count']}
            style={{
              circlePitchAlignment: 'map',
              circleColor: 'black',
              circleRadius: 10,
              circleOpacity: 0.4,
              circleStrokeWidth: 0,
              circleStrokeColor: 'white',
            }}
          />

          <Images images={{pin}} />
        </ShapeSource>
        {directionCoordinate && (
          <ShapeSource
            id="routeSource"
            lineMetrics
            shape={{
              properties: {},
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: directionCoordinate,
              },
            }}>
            <LineLayer
              id="exampleLineLayer"
              style={{
                lineColor: 'grey',
                lineCap: 'round',
                lineJoin: 'round',
                lineWidth: 3,
              }}
            />
          </ShapeSource>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f8ff',
  },
  heading: {
    fontSize: 18,
    color: '#34432D',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  datePickerBox: {
    flex: 1,
    height: 60,
    borderWidth: 1,
    borderColor: '#34432D',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  dateText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#34432D',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  map: {
    flex: 1,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default SearchPage;
