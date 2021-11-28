import React, { Component } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Video from "react-native-video";
import Icon from "react-native-ico-material-design";

const DisplayAthlete = ({ navigation }) => {
  return (
      const Video = require("vid.MOV");
    <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
      <Text>My video project!</Text>
      <View>
        <Video
          source={Video}
          style={{ width: 300, height: 300 }}
          controls={true}
          onBuffer={this.videoBuffer}
          ref={(ref) => {
            this.player = ref;
          }}
        />
      </View>
      {/*       
    <View style={styles.container}>
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
          <TouchableOpacity
            style={styles.icon}
            onPress={() =>
              navigation.navigate(ScreenNames.ATHLETE_COACH_SELECTION)
            }
          >
            <Icon name="home-button" height="40" width="40" color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() =>
              navigation.navigate(ScreenNames.ATHLETE_COACH_SELECTION)
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
              navigation.navigate(ScreenNames.ATHLETE_COACH_SELECTION)
            }
          >
            <Icon name="two-men" height="40" width="40" color="white" />
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "blue",
  },
  navContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    color: `#000000`,
  },

  navBar: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: `#000000`,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  icon: {
    padding: 14,
  },
});

export default DisplayAthlete;
