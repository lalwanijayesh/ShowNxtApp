import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
//import { Picker } from "@react-native-picker/picker";
import { ATHLETE, COACH } from "../constants/enums";
import DropDownPicker from "react-native-dropdown-picker";

const AthleteCoachSelection = (props) => {
  const [fullName, setFullName] = React.useState("");
  //const [selectedType, setType] = React.useState("none");

  const [userType, setUserType] = useState(false);
  const [type, setType] = useState(null);
  const [mockSport, setMockSports] = useState([
    { label: "Athlete", value: "athlete" },
    { label: "Coach", value: "coach" },
  ]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.nameInput}
        onChangeText={setFullName}
        value={fullName}
        placeholder="Enter full name"
      />

      <DropDownPicker
        searchable={true}
        searchPlaceholder="Search..."
        placeholder="Athlete or Coach?"
        open={userType}
        value={type}
        items={mockSport}
        setOpen={setUserType}
        setValue={setType}
        setItems={setMockSports}
        zIndex={3000}
        zIndexInverse={1000}
        style={[styles.spacingToHeader, styles.box, styles.pickleStyle]}
        dropDownContainerStyle={[styles.spacingToHeader, styles.pickleStyle]}
      />

      {fullName !== "" && type !== null && (
        <TouchableOpacity
          style={styles.buttonReady}
          onPress={() => {
            if (type === "athlete") {
              props.navigation.navigate("EmailPass", {
                userType: ATHLETE,
                fullName: fullName,
              });
            } else {
              props.navigation.navigate("EmailPass", {
                userType: COACH,
                fullName: fullName,
              });
            }
          }}
        >
          <Text style={styles.nextButton}>Next</Text>
        </TouchableOpacity>
      )}
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

  nextButton: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 375,
    width: 237,
    backgroundColor: "#fff",
  },

  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },

  nameInput: {
    width: 237,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    marginTop: 100,
  },

  typePicker: {
    width: 237,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
  },

  spacingToHeader: {
    marginTop: 35,
  },

  spacingBetween: {
    marginTop: 46,
  },

  box: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    height: 37,
  },

  pickleStyle: {
    width: Dimensions.get("screen").width - 89 * 2,
    marginLeft: 89,
  },

  nextBtn: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 69,
    marginTop: 312,
    height: 40,
  },

  nextText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
  },
});

export default AthleteCoachSelection;
