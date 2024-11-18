import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import cars from '../utils/carData';

const HomeScreen = ({navigation, route}) => {
  const {location, startDate, endDate} = route.params;

  const renderCar = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CarDetailScreen', {car: item})}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}/hr</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Showing cars at {location}</Text>
      <FlatList
        data={cars}
        renderItem={renderCar}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: '#f8f9fa'},
  heading: {fontSize: 18, marginBottom: 10},
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  image: {height: 100, borderRadius: 8},
  name: {fontSize: 16, fontWeight: 'bold', marginTop: 10},
  price: {fontSize: 14, color: '#555'},
});

export default HomeScreen;
