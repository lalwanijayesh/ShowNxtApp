import React from "react";
import { View, Text, Button } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to ShowNxt</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default WelcomeScreen;
