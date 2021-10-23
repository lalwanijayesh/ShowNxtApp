import React from "react";
import { View, Text, TextInput } from "react-native";

class CoachInfoRegistration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.jobInput}
          onChangeText={setJobTitle}
          value={jobTitle}
          placeholder="Enter your Job Title"
        />
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
});

export default CoachInfoRegistration;
