import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

// TODO: Replace image in the circle view
// TODO: find the way to let the user upload videos into react-native
// TODO: This screen is currently a pure UI, it will be fixed later to use to connect back-end for user data.
const CommunicationAthlete = (props) => {
  return (
    <View>
      <Text style={styles.buttonText}> Communication page!</Text>
    </View>
  );
};

export default CommunicationAthlete;

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    margin: 120,
  },
});
