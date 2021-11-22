import React from "react";
import { render } from "react-dom";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  useState,
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

const CompleteProfile1 = (props) => {
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [title, setTitle] = React.useState("");

  const[height, setHeight] = React.useState(0);

  const [userType, setUserType] = React.useState(false);
  const [type, setType] = React.useState(null);
  const [mockSport, setMockSports] = React.useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  focus () {
    this.textInput && this.textInput.focus()
  }

  return (
    <ScrollView>
      <TouchableOpacity style={styles.containerDone}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
      <View style={styles.containerPhoto}>
        <View style={styles.circle}></View>
        <TouchableOpacity>
          <Text>add photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerBio}>
        <Text> Bio</Text>
        <TextInput
          multiline={true}
          style={styles.bioInput}
          onChangeText={setName}
          value={name}
          placeholder="Give recruits background about yourself"
        />

        <TextInput
          placeholder="Your Placeholder"
          onChangeText={(value) => this.setState({ value })}
          style={[newStyle]}
          editable={true}
          multiline={true}
          value={value}
          onContentSizeChange={(e) =>
            this.updateSize(e.nativeEvent.contentSize.height)
          }
        />
       
       <TextInput
        ref={(view) => (this.textInput = view)}
        multiline
        onContentSizeChange={(event) => {
          if (event && event.nativeEvent && event.nativeEvent.contentSize) {
            setHeight(event.nativeEvent.contentSize.height)
          }
          props.onContentSizeChange && props.onContentSizeChange(event)
        }}
        style={[props.style, { height: Math.max(35, height) }]}
      />


      </View>
      <View style={styles.containerfields}>
        <View style={styles.container2column}>
          <Text>Name</Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={setName}
            value={name}
            placeholder="Name"
          />
        </View>
        <View style={styles.container2column}>
          <Text>Last Name</Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={setName}
            value={name}
            placeholder="LastName"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerDone: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 70,
    backgroundColor: "yellow",
  },
  containerBio: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 70,
    //backgroundColor: "purple",
  },

  container2column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 70,
    //backgroundColor: "purple",
  },
  containerfields: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 70,
    // backgroundColor: "blue",
  },

  bioInput: {
    width: 280,
    height: 40,
    padding: 10,
    backgroundColor: "yellow",
    alignItems: "center",
  },

  nameInput: {
    width: 120,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
  },
  containerPhoto: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    margin: -50,
  },

  doneText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    fontSize: 20,
  },

  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
  },
});

export default CompleteProfile1;
