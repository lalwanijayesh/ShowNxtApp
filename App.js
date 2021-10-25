import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import WelcomeScreen from "./screens/Welcome";
import RegisterScreen from "./screens/Register";
import LoginScreen from "./screens/Login";
import EmailPassScreen from "./screens/EmailPass";
import CoachRegisterScreen from "./screens/CoachRegister";
import AthleteRegisterScreen from "./screens/AthleteRegister";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./components/LoginCom";
import Register from "./components/RegisterCom";
import Dashboard from "./components/Dashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen
          name="Signup"
          component={Register}
          options={{ title: "Register" }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={({ title: "Login" }, { headerLeft: null })}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={({ title: "Dashboard" }, { headerLeft: null })}
        />
      </Stack.Navigator>

        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            title: "Welcome",
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: "Register",
          }}
        />

        <Stack.Screen
          name="CoachRegister"
          component={CoachRegisterScreen}
          options={{
            title: "Coach Registration",
          }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login",
          }}
        />

        <Stack.Screen
          name="AthleteRegister"
          component={AthleteRegisterScreen}
          options={{
            title: "Athlete Registration",
          }}
        />

        <Stack.Screen
          name="EmailPass"
          component={EmailPassScreen}
          options={{
            title: "EmailPass",
          }}
        />
      </Stack.Navigator> */}
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
