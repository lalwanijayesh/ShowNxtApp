import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import ScreenNames from "../constants/ScreenNames";

const height = Dimensions.get('screen').height;

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ ...styles.button, ...styles.loginButton }}
        onPress={() => navigation.navigate(ScreenNames.LOGIN)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(ScreenNames.ATHLETE_COACH_SELECTION)}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: height/2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  button: {
    display: "flex",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 15,
    width: 237,
  },
  buttonText: {
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
