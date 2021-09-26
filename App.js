import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Welcome from './screens/Welcome';
import Register from './screens/Register';
import CoachRegister from './screens/CoachRegister';
import AthleteRegister from './screens/AthleteRegister';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            title: "Welcome"
          }} />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: "Register"
          }} />

        <Stack.Screen
          name="CoachRegister"
          component={CoachRegister}
          options={{
            title: "Coach Registration"
          }} />

        <Stack.Screen
          name="AthleteRegister"
          component={AthleteRegister}
          options={{
            title: "Athlete Registration"
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
