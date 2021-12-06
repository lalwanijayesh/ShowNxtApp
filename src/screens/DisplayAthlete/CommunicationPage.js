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
import Icon from "react-native-ico-material-design";

const CommunicationPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonHalfScreenContainer}>
        <TouchableOpacity style={styles.buttonHalfScreen}></TouchableOpacity>
      </View>
      <Text style={styles.buttonText}>Welcome to the Communication Page!</Text>
      {/* NAVIGATION BAR ON THE BOTTOM OF PAGE */}
      <View style={styles.navContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate(ScreenNames.SEARCH_FOR_COACH)}
          >
            <Icon
              name="searching-magnifying-glass"
              height="40"
              width="40"
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() =>
              navigation.navigate(ScreenNames.DISPLAY_ATHLETE_DECLINE_ACCEPT)
            }
          >
            <Icon name="home-button" height="40" width="40" color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Icon
              name="black-envelope-email-symbol"
              height="40"
              width="40"
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate(ScreenNames.PROFILE_PAGE_COACH)}
          >
            <Icon name="two-men" height="40" width="40" color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* NAVIGATION BAR ON THE BOTTOM OF PAGE */}
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
  buttonHalfScreenContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonHalfScreen: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "50%",
    color: "blue",
    color: "blue",
  },

  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 500,
    bottom: 0,
  },
  icon: {
    padding: 14,
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    margin: 120,
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
});

export default CommunicationPage;
