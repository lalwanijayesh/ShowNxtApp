import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import WelcomeScreen from "./screens/Welcome";
import AthleteCoachSelection from "./screens/AthleteCoachSelection";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmailPassScreen from "./screens/EmailPass";

import VerificationScreen from "./screens/CoachRegistration/Verification";
import CoachInfoRegistration from "./screens/CoachRegistration/CoachInfoRegistration";
import CoachPositionSelection from "./screens/CoachRegistration/CoachPositionSelection";
import CompleteProfile1 from "./screens/CoachRegistration/CompleteProfile1";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AthleteCoachSelection"
          component={AthleteCoachSelection}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="EmailPass"
          component={EmailPassScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Verification"
          component={VerificationScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CoachInfoRegistration"
          component={CoachInfoRegistration}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CoachPositionSelection"
          component={CoachPositionSelection}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CompleteProfile1"
          component={CompleteProfile1}
          options={{
            headerShown: false,
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
