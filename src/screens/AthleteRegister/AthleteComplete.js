import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Button,
  Platform,
  Alert,
} from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import Firebase from "../../firebase/firebase";
import ScreenNames from "../../constants/ScreenNames";
import ImagePickerExample from "../VideoUpload";
import UserIdContext from "../../AppContext";

// TODO: Replace image in the circle view
// TODO: This screen is currently a pure UI, it will be fixed later to use to connect back-end for user data.
const AthleteComplete = ({ navigation, route }) => {
  const [userId, setUserId] = useContext(UserIdContext);

  const testData = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
  ];

  const renderItem = (item) => {
    return (
      <View style={{ marginRight: 17 }}>
        <View style={styles.videoStyle}>
          <ImagePickerExample />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.navigate(ScreenNames.ATHLETE_ACADEMIC)}
      >
        <Text style={styles.back}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.register}>{"COMPLETE PROFILE"}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.avatar}></View>
        <View>
          <Text style={styles.textName}>{route.params.fullName}</Text>
          <Text style={[styles.spacingBetweenText, styles.textInfo]}>
            {route.params.positionName}
          </Text>
          <Text style={styles.textInfo}>{route.params.schoolName}</Text>
        </View>
      </View>
      <Text style={styles.videoTitle}>{"Videos"}</Text>

      <View style={{ marginHorizontal: 34, marginTop: 23 }}>
        <FlatList
          bounces={false}
          data={testData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.id}
        />
      </View>

      <Text style={styles.text}>
        {"Place the most explosive video first in line for the best result."}
      </Text>

      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => {
          setUserId(route.params.userId);

          navigation.navigate(ScreenNames.ATHLETE_TAB_FLOW, route.params);
        }}
      >
        <Text style={styles.nextText}>{"Start Exploring"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AthleteComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  backContainer: {
    position: "absolute",
    left: 42,
    top: 40,
  },

  back: {
    fontSize: 30,
    fontWeight: "bold",
  },

  register: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
    marginTop: 54,
    alignSelf: "center",
  },

  infoContainer: {
    marginTop: 40,
    flexDirection: "row",
    marginHorizontal: 32,
  },

  avatar: {
    width: 100,
    height: 100,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 34,
  },

  textName: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
    color: "#000000",
  },

  spacingBetweenText: {
    marginTop: 30,
  },

  textInfo: {
    color: "#555555",
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },

  videoTitle: {
    marginTop: 57,
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
    color: "#000000",
    marginLeft: 34,
  },

  videoStyle: {
    width: 135,
    height: 271,
    backgroundColor: "#EEEEEE",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    marginTop: 22,
    marginLeft: 34,
    fontSize: 8,
    lineHeight: 11,
    color: "#000000",
  },

  nextBtn: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 69,
    marginTop: 71,
    backgroundColor: "#000000",
    height: 40,
    borderRadius: 6,
  },

  nextText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
  },
});
