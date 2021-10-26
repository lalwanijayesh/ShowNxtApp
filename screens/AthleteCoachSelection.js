import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ATHLETE, COACH } from "../constants/enums";

const AthleteCoachSelection = (props) => {
  const [fullName, setFullName] = React.useState("");
  const [selectedType, setType] = React.useState("none");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.nameInput}
        onChangeText={setFullName}
        value={fullName}
        placeholder="Enter full name"
      />

      <Picker
        style={styles.typePicker}
        mode="dropdown"
        selectedValue={selectedType}
        onValueChange={(itemValue, itemIndex) => {
          setType(itemValue);
        }}
      >
        <Picker.Item label="Athlete or Coach?" enabled={false} value="none" />
        <Picker.Item label="Athlete" value="athlete" />
        <Picker.Item label="Coach" value="coach" />
      </Picker>

      {fullName !== "" && selectedType !== "none" && (
        <TouchableOpacity
          style={styles.buttonReady}
          onPress={() => {
            if (selectedType === "athlete") {
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
    margin: 30,
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
});

export default AthleteCoachSelection;
