import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  Dimensions,
} from "react-native";
import Icon from "react-native-ico-material-design";
import ScreenNames from "../constants/ScreenNames";

const AthleteNavBar = (props) => {
  return (
    <View
      style={{
        position: "absolute",
        top: Dimensions.get("window").height - 25,
        alignItems: "center",
        color: `#000000`,
      }}
    >
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => props.navigation.navigate(ScreenNames.SCHOOL_SEARCH)}
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
            props.navigation.navigate(ScreenNames.ATHLETE_COMMUNICATION)
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
            props.navigation.navigate(ScreenNames.ATHLETE_COMPLETE)
          }
        >
          <Icon name="two-men" height="40" width="40" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const styles = (bottom) =>
const styles = StyleSheet.create({
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

  // navContainer: {
  //   position: "absolute",
  //   alignItems: "center",
  //   color: `#000000`,
  // },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default AthleteNavBar;
