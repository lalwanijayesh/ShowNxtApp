import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ScreenNames from "../../constants/ScreenNames";

// TODO: Replace image in the circle view
// TODO: find the way to let the user upload videos into react-native
// TODO: This screen is currently a pure UI, it will be fixed later to use to connect back-end for user data.
const CompleteAthleteProfile = ({ navigation }) => {
  return (
    <View>
      <Text> Hello </Text>
    </View>
  );
};

export default CompleteAthleteProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
