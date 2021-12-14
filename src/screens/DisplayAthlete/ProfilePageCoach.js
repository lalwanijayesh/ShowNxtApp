import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
// import ScreenNames from "../constants/ScreenNames";
import Icon from "react-native-ico-material-design";

const ProfilePageCoach = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Welcome to the Coach Profile Page!</Text>
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
  icon: {
    padding: 14,
  },

  navBar: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: `#000000`,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  navContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    color: `#000000`,
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    margin: 90,
  },
});

export default ProfilePageCoach;
