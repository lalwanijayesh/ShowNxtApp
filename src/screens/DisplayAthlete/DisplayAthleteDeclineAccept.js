import React, { Component, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Platform,
} from "react-native";
import Icon from "react-native-ico-material-design";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import sampleVideo from "../../../assets/video/sample.mp4";
import sampleVideoDog from "../../../assets/video/dogvid.mp4";
import { LinearGradient } from "expo-linear-gradient";

// TODO: make a method that for each video displays a little white circle at the bottom of the screen

const DisplayAthlete = ({ navigation }) => {
  constructor;

  const videoRef = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [visible, setVisible] = React.useState(false);

  // write a function that changes the state

  return (
    <View style={styles.container}>
      {/* DISPLAYING THE VIDEO  */}
      <View style={styles.containerVid}>
        {sampleVideo && (
          <Video
            ref={videoRef}
            style={styles.video}
            // source={{uri: video}}
            source={sampleVideoDog}
            useNativeControls
            isLooping
            resizeMode="contain"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        )}
      </View>
      {/* DISPLAYING THE VIDEO  */}

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
      {/* NAVIGATION BAR ON THE BOTTOM OF PAGE */}

      {/* BUTTONS TO REJECT AND ACCEPT + DOTS FOR EACH VID */}
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
      {/* BUTTONS TO REJECT AND ACCEPT + DOTS FOR EACH VID */}

      {/* NAME/AGE OF ATHLETE */}
      <View style={styles.nameAgeBar}>
        <Text style={styles.textName}> Jake Smith, 19</Text>
      </View>
      {/* NAME/AGE OF ATHLETE */}

      {/* POSITION OF ATHLETE */}
      <View style={styles.positionBar}>
        <Text style={styles.textLocation}> 🏐 Goalkeeper</Text>
      </View>
      {/* POSITION OF ATHLETE */}

      {/* LOCATION OF ATHLETE */}
      <View style={styles.locationBar}>
        <Text style={styles.textLocation}> 📍 Boston, MA</Text>
      </View>
      {/* LOCATION OF ATHLETE */}
      {/* TOP DROPDOWN BUTTON */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.symbolText}>V</Text>
      </TouchableOpacity>
      {/* TOP DROPDOWN BUTTON */}
      {/* ATHLETE INFO */}
      <View style={visible ? styles.atheleteInfoBar : styles.hidden}>
        <Text style={styles.textLocation}> </Text>
        <Text style={styles.textLocation}> </Text>
        <Text style={styles.textInfoAthlete}> Height: 6'2"</Text>
        <Text style={styles.textInfoAthlete}> Weight: 170lbs</Text>
        <Text style={styles.textInfoAthlete}> GPA: 3.5</Text>
        <Text style={styles.textInfoAthlete}> SAT: 1500</Text>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text style={styles.symbolText}>^</Text>
        </TouchableOpacity>
      </View>
      {/* ATHLETE INFO */}
    </View>
  );
};

const styles = StyleSheet.create({
  containerVid: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    //width: 640 * 1.3,
    //height: 400 * 1.3,
    width: 640 * 2.3,
    height: 400 * 2.3,
  },
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
    width: "105%",
    // backgroundColor: `#000000`,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonsContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 85,
    color: `#000000`,
  },

  locationBar: {
    flexDirection: "row",
    width: "90%",
    //backgroundColor: `pink`,
    //alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 190,
    alignItems: "flex-start",
  },
  positionBar: {
    flexDirection: "row",
    width: "90%",
    //backgroundColor: `pink`,
    //alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 220,
    alignItems: "flex-start",
  },

  nameAgeBar: {
    flexDirection: "row",
    width: "90%",
    //backgroundColor: `pink`,
    //alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 253,
    alignItems: "flex-start",
  },
  dropdownButton: {
    flexDirection: "row",
    width: "90%",
    //backgroundColor: `pink`,
    //alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 60,
    alignItems: "center",
  },

  icon: {
    padding: 14,
  },
  circleDecline: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: "red",
    margin: 5,
    display: "flex",
    alignItems: "center",
  },
  circleAccept: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
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
    margin: 15,
  },
  textLocation: {
    // fontWeight: "bold",
    color: "white",
    fontSize: 25,
  },

  textInfoAthlete: {
    //fontWeight: "bold",
    color: "white",
    fontSize: 26,
  },

  textName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 35,
  },

  atheleteInfoBar: {
    position: "absolute",
    alignItems: "center",
    top: 0,
    color: `#000000`,
    height: 280,
    flexDirection: "column",
    width: "100%",
    backgroundColor: `#4b0082`,
    justifyContent: "space-evenly",
    opacity: 0.8,
    borderRadius: 10,
  },

  containerForGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 500,
    bottom: 0,
  },

  hidden: {
    display: "none",
  },
});

export default DisplayAthlete;
