import React, { useCallback, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ATHLETE, COACH } from "../constants/enums";
import ScreenNames from "../constants/ScreenNames";

const AthleteCoachSelection = ({ navigation, props }) => {
  const [fullName, setFullName] = React.useState("");

  const [userType, setUserType] = useState(false);
  const [type, setType] = useState(null);
  const [typeList, setTypeList] = useState([
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
        searchable={false}
        searchPlaceholder="Search..."
        placeholder="Athlete or Coach?"
        open={userType}
        value={type}
        items={typeList}
        setOpen={setUserType}
        setValue={setType}
        setItems={setTypeList}
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
              navigation.navigate(ScreenNames.EMAIL_PASSWORD, {
                userType: ATHLETE,
                fullName: fullName,
              });
            } else {
              navigation.navigate(ScreenNames.COACH_EMAIL_PASS, {
                userType: COACH,
                fullName: fullName,
              });
            }
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.navigate(ScreenNames.WELCOME)}
      >
        <Text style={styles.back}>{"<"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "1000%",
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

  // TODO add arrow icon in button
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
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

  buttonTextArrow: {
    fontWeight: "bold",
    textAlign: "right",
    color: "black",
    fontSize: 20,
  },
});

export default AthleteCoachSelection;
