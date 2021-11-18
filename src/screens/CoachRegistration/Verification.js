import React from "react";
import { render } from "react-dom";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import { ATHLETE, COACH } from "../../../constants/enums";

const VerificationScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>You have just been sent a verification to your email!</Text>
      <TouchableOpacity
        style={styles.buttonReady}
        onPress={() => {
          props.navigation.navigate(
            "CoachInfoRegistration",
            props.route.params
          );
        }}
      >
        <Text style={styles.buttonText}>Next</Text>
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
    margin: 90,
  },

  buttonReady: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 20,
    width: 237,
    backgroundColor: "#fff",
  },

  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default VerificationScreen;
