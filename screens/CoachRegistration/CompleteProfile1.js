import React from "react";
import { render } from "react-dom";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const CompleteProfile1 = (props) => {
  return (
    <View style={styles.circle}>
      <Text style={styles.oneText}>1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "grey",
    margin: 80,
  },
  oneText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    fontSize: 20,
    margin: 3,
  },
});

export default CompleteProfile1;
