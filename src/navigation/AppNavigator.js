import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CarDetailScreen from '../screens/CarDetailScreen';
import SearchPage from '../screens/SearchPage';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SearchPage">
      <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{title: 'Vloto', headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Car Listing'}}
      />
      <Stack.Screen
        name="CarDetailScreen"
        component={CarDetailScreen}
        options={{title: 'Car Details'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
