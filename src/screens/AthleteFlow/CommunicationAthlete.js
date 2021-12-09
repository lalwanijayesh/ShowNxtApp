import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ScreenNames from "../../constants/ScreenNames";
import Icon from "react-native-ico-material-design";

// TODO: Replace image in the circle view
// TODO: find the way to let the user upload videos into react-native
// TODO: This screen is currently a pure UI, it will be fixed later to use to connect back-end for user data.
const CommunicationAthlete = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.buttonText}> Communication page!</Text>

      {/* NAVIGATION BAR ON THE BOTTOM OF PAGE */}
      <View style={styles.navContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate(ScreenNames.SCHOOL_SEARCH)}
          >
            <Icon
              name="searching-magnifying-glass"
              height="40"
              width="40"
              color="white"
            />
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
            //onPress={() => navigation.navigate(ScreenNames.ATHLETE_PROFILE)}
          >
            <Icon name="two-men" height="40" width="40" color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* NAVIGATION BAR ON THE BOTTOM OF PAGE */}
    </View>
  );
};

export default CommunicationAthlete;

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
  navContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: -610,
    color: `#000000`,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    margin: 120,
  },
});
