import React from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';

const CarDetailScreen = ({route, navigation}) => {
  const {car} = route.params;

  return (
    <View style={styles.container}>
      <Image source={{uri: car.image}} style={styles.carImage} />
      <Text style={styles.carName}>{car.name}</Text>
      <Text>Price: {car.price} per hour</Text>
      <Text>Description: Great for city and highway driving.</Text>
      <Button title="Rent Now" onPress={() => alert('Booking Successful')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  carImage: {width: '100%', height: 200, borderRadius: 8, marginBottom: 16},
  carName: {fontSize: 24, fontWeight: 'bold', marginBottom: 8},
});

export default CarDetailScreen;
