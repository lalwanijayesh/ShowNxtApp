import React, { useState } from "react";
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
import Icon from "react-native-ico-material-design";

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
      <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation.navigate(ScreenNames.WELCOME)}
      >
        <Icon
            name="left-arrow-key"
            height={15}
            width={15}
            color="black"
        />
      </TouchableOpacity>
      <Text style={styles.header}>REGISTER</Text>
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
        style={[styles.spacingToHeader, styles.box, styles.pickerStyle]}
        dropDownContainerStyle={[styles.spacingToHeader, styles.pickerStyle]}
      />

      {fullName !== "" && type !== null && (
        <TouchableOpacity
          style={styles.buttonReady}
          onPress={() => {
            if (type === "athlete") {
              navigation.navigate(ScreenNames.ATHLETE_EMAIL_PASSWORD, {
                userType: ATHLETE,
                fullName: fullName,
              });
            } else {
              navigation.navigate(ScreenNames.COACH_EMAIL_PASSWORD, {
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

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  header: {
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    marginTop: 50,
    fontWeight: "bold",
    fontSize: 16
  },
  backContainer: {
    position: "absolute",
    left: 40,
    top: 60,
  },
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
    marginTop: 100,
  },
  spacingToHeader: {
    marginTop: 60,
  },
  box: {
    borderRadius: 6,
    height: 37,
  },
  pickerStyle: {
    width: Dimensions.get("screen").width - 89 * 2,
    marginLeft: 89,
  },
  buttonReady: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 300,
    width: 237,
    backgroundColor: "#000000",
  }
});

export default AthleteCoachSelection;
