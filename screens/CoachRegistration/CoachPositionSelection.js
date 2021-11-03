import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Touchable,
  TextInput,
} from "react-native";

const CoachPositionSelection = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.startText}>Positions recruitng for Fall 2022</Text>
    </View>

    <View>
    <Text>Positions recruitng for Fall 2022</Text>
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

  startText: {
    fontWeight: "bold",
    textAlign: "center",
    margin: 90,
  },
});

export default CoachPositionSelection;
