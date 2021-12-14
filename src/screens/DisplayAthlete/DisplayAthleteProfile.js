import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
//import ScreenNames from "../constants/ScreenNames";
import Icon from "react-native-ico-material-design";
import CoachNavBar from "../CoachNavBar";

const AthleteProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.buttonText}> ATHLETE PROFILE PAGE! </Text>
      </ScrollView>

      <CoachNavBar navigation={navigation} />
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

export default AthleteProfile;
