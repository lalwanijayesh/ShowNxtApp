import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import ScreenNames from "../constants/ScreenNames";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ ...styles.button, ...styles.loginButton }}
        onPress={() => Alert.alert("Login!")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(ScreenNames.ATHLETE_COACH_SELECTION)}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(ScreenNames.SCHOOL_INFO)}
      >
        <Text style={styles.buttonText}>SKIP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

  loginButton: {
    marginTop: 300,
  },

  buttonText: {
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
