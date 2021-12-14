import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-ico-material-design";
import ScreenNames from "../constants/ScreenNames";

const CoachNavBar = (props) => {
  return (
    <View style={styles.navContainer}>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() =>
            props.navigation.navigate(ScreenNames.SEARCH_FOR_COACH)
          }
        >
          <Icon
            name="searching-magnifying-glass"
            height="40"
            width="40"
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name="home-button" height="40" width="40" color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() =>
            props.navigation.navigate(ScreenNames.COMMUNICATION_PAGE)
          }
        >
          <Icon
            name="black-envelope-email-symbol"
            height="40"
            width="40"
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() =>
            props.navigation.navigate(ScreenNames.PROFILE_PAGE_COACH)
          }
        >
          <Icon name="two-men" height="40" width="40" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

  icon: {
    padding: 14,
  },
});

export default CoachNavBar;
