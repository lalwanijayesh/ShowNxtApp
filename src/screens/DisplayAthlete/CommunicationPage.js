import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
//import ScreenNames from "../constants/ScreenNames";

const CommunicationPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>
        Welcome to the Communication page! (that is out of scope)
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
    margin: 90,
  },
});

export default CommunicationPage;
