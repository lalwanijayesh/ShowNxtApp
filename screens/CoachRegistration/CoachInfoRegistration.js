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

class CoachInfoRegistration extends React.Component {
  constructor(props) {
    super(props);

    // let { fullName, email, password } = props.route.params;

    this.state = {
      school: "",
      sport: "",
      jobTitle: "",
    };

    this._setSchool = this._setSchool.bind(this);
    this._setSport = this._setSport.bind(this);
    this._setJobTitle = this._setJobTitle.bind(this);
  }

  _setSchool(newSchool) {
    this.setState((state) => ({
      school: newSchool,
      sport: state.sport,
      jobTitle: state.jobTitle,
    }));
  }

  _setSport(newSport) {
    this.setState((state) => ({
      school: state.school,
      sport: newSport,
      jobTitle: state.jobTitle,
    }));
  }

  _setJobTitle(newJobTitle) {
    this.setState((state) => ({
      school: state.school,
      sport: state.sport,
      jobTitle: newJobTitle,
    }));
  }

  _getSchools() {
    return ["Northeastern", "Harvard", "Boston University", "Idk something"];
  }

  _getSports() {
    return ["Squash", "Soccer", "Football", "Hockey", "Croquet", "Bowling"];
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker
          style={styles.typePicker}
          mode="dropdown"
          selectedValue={this.state.school}
          onValueChange={(itemValue, itemIndex) => {
            this._setSchool(itemValue);
          }}
        >
          <Picker.Item label="Select University" enabled={false} value="none" />

          {this._getSchools().map((schoolName) => {
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
          selectedValue={this.state.school}
          onValueChange={(itemValue, itemIndex) => {
            this._setSport(itemValue);
          
          }}
        >
          <Picker.Item label="Select Sport" enabled={false} value="none" />

          {this._getSports().map((sportName) => {
            return (
              <Picker.Item
                label={sportName}
                value={sportName}
                key={sportName}
              />
            );
          })}
        </Picker>

        <TextInput
          style={styles.jobInput}
          onChangeText={this._setJobTitle}
          value={this.state.jobTitle}
          placeholder="Enter your Job Title"
        />

        {this.state.school !== "none" &&
          this.state.sport !== "none" &&
          this.state.jobTitle !== "" && (
            <TouchableOpacity style={styles.buttonReady}
              onPress={() => {
                this.props.navigation.navigate(
                  "CoachPositionSelection",
                  this.props.route.params
                );
              }}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          )}
      </View>
    );
  }
}

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
