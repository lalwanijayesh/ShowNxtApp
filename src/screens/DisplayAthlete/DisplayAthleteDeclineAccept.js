import React, { Component } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Video from "react-native-video";
import Icon from "react-native-ico-material-design";

// TODO: make a method that for each video displays a little white circle at the bottom of the screen

const DisplayAthlete = ({ navigation }) => {
  return (
    // <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
    //   <View>
    //     <Video
    //       source={{
    //         uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1",
    //       }}
    //       repeat={true}
    //       paused={false}
    //     />
    //   </View>
    // </View>

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
          <TouchableOpacity style={styles.icon}>
            <Icon name="home-button" height="40" width="40" color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate(ScreenNames.COMMUNICATION_PAGE)}
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
            onPress={() => navigation.navigate(ScreenNames.PROFILE_PAGE_COACH)}
          >
            <Icon name="two-men" height="40" width="40" color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsBar}>
          <TouchableOpacity style={styles.circleDecline}>
            <Text style={styles.symbolText}>X</Text>
          </TouchableOpacity>
          <View style={styles.circlePerVid}></View>
          <TouchableOpacity style={styles.circleAccept}>
            <Text style={styles.symbolText}>✓</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  buttonsBar: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: `#000000`,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonsContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 85,
    color: `#000000`,
  },

  icon: {
    padding: 14,
  },
  circleDecline: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: "red",
    margin: 5,
    display: "flex",
    alignItems: "center",
  },
  circleAccept: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: "mediumseagreen",
    margin: 5,
    display: "flex",
    alignItems: "center",
  },
  circlePerVid: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: "white",
    margin: 5,
    display: "flex",
    alignItems: "center",
  },
  symbolText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 40,
    textAlign: "center",
    margin: 11,
  },
});

export default DisplayAthlete;
