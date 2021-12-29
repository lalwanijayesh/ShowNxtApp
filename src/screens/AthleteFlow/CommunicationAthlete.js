import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

const CommunicationAthlete = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>
        COMMUNICATION PAGE
      </Text>
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
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    margin: 100,
  }
});

export default CommunicationAthlete;