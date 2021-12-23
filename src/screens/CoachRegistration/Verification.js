import React from "react";
import { render } from "react-dom";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import ScreenNames from "../../constants/ScreenNames";
// import { ATHLETE, COACH } from "../../../constants/enums";

const VerificationScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>
        Use the verification link at the provided email: {props.email}
      </Text>
      <TouchableOpacity
        style={styles.buttonReady}
        onPress={() => {
          props.navigation.navigate(
            ScreenNames.COACH_INFO_REGISTRATION,
            props.route.params
          );
        }}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => props.navigation.navigate(ScreenNames.COACH_EMAIL_PASS)}
      >
        <Text style={styles.back}>{"<"}</Text>
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

  backContainer: {
    position: "absolute",
    left: -45,
    top: -40,
  },

  back: {
    fontSize: 30,
    fontWeight: "bold",
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
