import React from "react";
import { render } from "react-dom";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const CompleteProfile1 = (props) => {
  return (
    <View style={styles.circle}>
      <Text style={styles.oneText}>Complete Profile Page!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    display: "flex",
    margin: 60,
  },

  oneText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    fontSize: 20,
  },
});

export default CompleteProfile1;
