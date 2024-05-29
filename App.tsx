

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import TabNavigator from './src/navigators/TabNavigator';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import SeatBookingScreen from './src/screens/SeatBookingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Tab" component={TabNavigator} options={{animation:'default'}} />
        <Stack.Screen name="MovieDetails" component={MovieDetailScreen} options={{animation:'slide_from_right'}} />
        <Stack.Screen name="SeatBooking" component={SeatBookingScreen} options={{animation:'slide_from_bottom'}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;



