import React from "react";
import { StyleSheet} from "react-native";
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
