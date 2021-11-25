import React, { useCallback, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ATHLETE, COACH } from "../constants/enums";
import ScreenNames from "../constants/ScreenNames";

const AthleteCoachSelection = (props) => {
  const [fullName, setFullName] = React.useState("");
  //const [selectedType, setType] = React.useState("none");

  const [userType, setUserType] = useState(false);
  const [type, setType] = useState(null);
  const [mockSport, setMockSports] = useState([
    { label: "Athlete", value: "athlete" },
    { label: "Coach", value: "coach" },
  ]);

  /**
   * close the Position dropdown when the sport dropdown is opened.
   */
  const handleSportOpen = useCallback(() => {
    setUserType(true);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.nameInput}
        onChangeText={setFullName}
        value={fullName}
        placeholder="Enter full name"
      />
      <DropDownPicker
        searchable={false}
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
              props.navigation.navigate(ScreenNames.EMAIL_PASSWORD, {
                userType: ATHLETE,
                fullName: fullName,
              });
            } else {
              props.navigation.navigate(ScreenNames.COACH_EMAIL_PASS, {
                userType: COACH,
                fullName: fullName,
              });
            }
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// trying to add little arrow on next button
// <Text style={styles.buttonTextArrow}>›</Text>

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "1000%",
  },

  nextButton: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 370,
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
    marginTop: 175,
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
    marginTop: 60,
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

  nextText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
  },

  buttonReady: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 410,
    width: 237,
    backgroundColor: "#000000",
  },

  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },

  buttonTextArrow: {
    fontWeight: "bold",
    textAlign: "right",
    color: "black",
    fontSize: 20,
  },
});

export default AthleteCoachSelection;
