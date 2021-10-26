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
    <View>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
  },

  selectedPositionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 200,
    width: "80%",
  },

  selectedPositionsScroll: {
    height: 300,
    width: "100%",
  },

  selectedPositionContainer: {
    width: 120,
    height: 35,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 30,
  },

  selectedPositionLabel: {
    // width: 80,
    height: 30,
    paddingLeft: 10,
  },

  unselectButton: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    // padding: 10,
    margin: 30,
    width: 20,
    height: 20,
    // backgroundColor: "#fff",
    paddingRight: 10,
  },

  unselectLabel: {
    // textAlign: "center",
  },

  commonPositionsContainer: {
    height: 150,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    width: "80%",
  },

  commonPositionsScroll: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  button: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 30,
    width: 237,
    backgroundColor: "#fff",
  },

  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CoachPositionSelection;
