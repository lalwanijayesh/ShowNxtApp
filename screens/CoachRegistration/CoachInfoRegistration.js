import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const getSchools = () => {
  return ["Northeastern", "Harvard", "Boston University", "Idk something"];
};

const getSports = () => {
  return ["Squash", "Soccer", "Football", "Hockey", "Croquet", "Bowling"];
};

const CoachInfoRegistration = (props) => {
  let [school, setSchool] = React.useState("");
  let [sport, setSport] = React.useState("");
  let [jobTitle, setJobTitle] = React.useState("");

  return (
    <View style={styles.container}>
      <Picker
        style={styles.typePicker}
        mode="dropdown"
        selectedValue={school}
        onValueChange={(itemValue, itemIndex) => {
          setSchool(itemValue);
        }}
      >
        <Picker.Item label="Select University" enabled={false} value="none" />

        {getSchools().map((schoolName) => {
          return (
            <Picker.Item
              label={schoolName}
              value={schoolName}
              key={schoolName}
            />
          );
        })}
      </Picker>

      <Picker
        style={styles.typePicker}
        mode="dropdown"
        selectedValue={school}
        onValueChange={(itemValue, itemIndex) => {
          setSport(itemValue);
        }}
      >
        <Picker.Item label="Select Sport" enabled={false} value="none" />

        {getSports().map((sportName) => {
          return (
            <Picker.Item label={sportName} value={sportName} key={sportName} />
          );
        })}
      </Picker>

      <TextInput
        style={styles.jobInput}
        onChangeText={setJobTitle}
        value={jobTitle}
        placeholder="Enter your Job Title"
      />

      {school !== "none" && sport !== "none" && jobTitle !== "" && (
        <TouchableOpacity
          style={styles.buttonReady}
          onPress={() => {
            props.navigation.navigate("CoachPositionSelection", {
              fullName: props.route.params.fullName,
              email: props.route.params.email,
              password: props.route.params.password,
              school: school,
              sport: sport,
              jobTitle: jobTitle,
            });
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  jobInput: {
    width: 237,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    marginTop: 100,
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    margin: 29,
  },

  buttonReady: {
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

  typePicker: {
    width: 237,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
  },
});

export default CoachInfoRegistration;
