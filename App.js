import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import WelcomeScreen from "./screens/Welcome";
import AthleteCoachSelection from "./screens/AthleteCoachSelection";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoachRegisterScreen from "./screens/CoachRegister";
import EmailPassScreen from "./screens/EmailPass";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            title: "Welcome",
            // headerStyle: {
            //   backgroundColor: "red",
            // },
            // headerTintColor: "fff",
          }}
        />

        <Stack.Screen
          name="AthleteCoachSelection"
          component={AthleteCoachSelection}
          options={{
            title: "Register",
          }}
        />

        <Stack.Screen
          name="EmailPass"
          component={EmailPassScreen}
          options={{
            title: "Register",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
