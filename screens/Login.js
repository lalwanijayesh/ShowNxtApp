import React from "react";
import { View, Text, useState, TextInput, Button } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <TextInput placeholder="Enter your email" />

      <TextInput placeholder="Enter your password" />

      <Button title="Next" />
    </View>
  );
};

export default LoginScreen;
