import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text>Name: Alziyan Ansari</Text>
      <Text>Email: alziyan@test.com</Text>
      <Button
        title="View Booking History"
        onPress={() => alert('View past bookings')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 16},
});

export default ProfileScreen;
