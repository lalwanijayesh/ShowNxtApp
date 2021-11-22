import React, { useCallback } from "react";
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
  const [jobTitle, setJobTitle] = React.useState("");

  const [height, setHeight] = React.useState(0);

  const [userType, setUserType] = React.useState(false);
  const [type, setType] = React.useState(null);
  const [mockSport, setMockSports] = React.useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  const [uniVisible1, setUniVisible1] = React.useState(false);
  const [uni1, setUni1] = React.useState(null);
  const [mockUni1, setMockUni1] = React.useState([
    { label: "Freshman", value: "freshman" },
    { label: "Softmore", value: "softmore" },
    { label: "Junior", value: "junior" },
    { label: "Senior", value: "senior" },
  ]);

  const [uniVisible2, setUniVisible2] = React.useState(false);
  const [uni2, setUni2] = React.useState(null);
  const [mockUni2, setMockUni2] = React.useState([
    { label: "Northeastern", value: "Northeastern" },
    { label: "Harvard", value: "harvard" },
    { label: "Bu", value: "bu" },
  ]);

  const [sportVisible1, setSportVisible1] = React.useState(false);
  const [sport1, setSport1] = React.useState(null);
  const [mockSport1, setMockSport1] = React.useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  const [sportVisible2, setSportVisible2] = React.useState(false);
  const [sport2, setSport2] = React.useState(null);
  const [mockSport2, setMockSport2] = React.useState([
    { label: "Squash", value: "squash" },
    { label: "Soccer", value: "soccer" },
  ]);

  const focus = () => {
    return this.textInput && this.textInput.focus();
  };

  const onUniOpen = useCallback(() => {
    setSportVisible1(false);
  }, []);

  const onSportOpen = useCallback(() => {
    setUniVisible1(false);
  }, []);

  return (
    <ScrollView>
      <TouchableOpacity style={styles.containerDone}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
      <View style={styles.containerPhoto}>
      <!-- dfghjkl -->
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

      <View style={styles.containerfields1}>
        <View style={styles.container2column1}>
          <Text>Gender</Text>
          <DropDownPicker
            //searchable={true}
            //searchPlaceholder="Search..."
            placeholder="Gender"
            open={sportVisible1}
            value={sport1}
            items={mockSport1}
            setOpen={setSportVisible1}
            setValue={setSport1}
            setItems={setMockSport1}
            zIndex={3000}
            zIndexInverse={1000}
            onOpen={onSportOpen}
            style={[
              styles.spacingToSportPicker,
              styles.box,
              styles.pickleStyle,
            ]}
            dropDownContainerStyle={[
              styles.spacingtoSportDropdown,
              styles.pickleStyle,
            ]}
          />
        </View>

        <View style={styles.container2column1}>
          <Text>Grade</Text>
          <DropDownPicker
            //searchable={true}
            //searchPlaceholder="Search..."
            placeholder="Grade"
            open={uniVisible1}
            value={uni1}
            items={mockUni1}
            setOpen={setUniVisible1}
            setValue={setUni1}
            setItems={setMockUni1}
            zIndex={3001}
            zIndexInverse={1001}
            onOpen={onUniOpen}
            style={[styles.spacingToUniPicker, styles.box, styles.pickleStyle]}
            dropDownContainerStyle={[
              styles.spacingToUniDropdown,
              styles.pickleStyle,
            ]}
          />
        </View>
      </View>

      <View style={styles.container2column1}>
        <Text>University</Text>
        <DropDownPicker
          searchable={true}
          searchPlaceholder="Search..."
          placeholder="Find University"
          open={uniVisible2}
          value={uni2}
          items={mockUni2}
          setOpen={setUniVisible2}
          setValue={setUni2}
          setItems={setMockUni2}
          zIndex={3001}
          zIndexInverse={1001}
          onOpen={onUniOpen}
          style={[styles.spacingToUniPicker, styles.box, styles.pickleStyle]}
          dropDownContainerStyle={[
            styles.spacingToUniDropdown,
            styles.pickleStyle,
          ]}
        />
      </View>

      <View style={styles.containerfields1}>
        <View style={styles.container2column1}>
          <Text>Coaching Sport</Text>
          <DropDownPicker
            searchable={true}
            searchPlaceholder="Search..."
            placeholder="Sport"
            open={sportVisible2}
            value={setSport2}
            items={mockSport2}
            setOpen={setSportVisible2}
            setValue={setSport2}
            setItems={setMockSport2}
            zIndex={3000}
            zIndexInverse={1000}
            onOpen={onSportOpen}
            style={[
              styles.spacingToSportPicker,
              styles.box,
              styles.pickleStyle,
            ]}
            dropDownContainerStyle={[
              styles.spacingtoSportDropdown,
              styles.pickleStyle,
            ]}
          />
        </View>

        <View style={styles.container2column1}>
          <Text>Job Title</Text>
          <TextInput
            style={styles.jobInput}
            onChangeText={setJobTitle}
            value={jobTitle}
            placeholder="Title"
          />
        </View>
      </View>
    </ScrollView>
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
    marginTop: 55,
  },
  box: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    height: 37,
  },

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
  },

  container2column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 70,
  },

  container2column1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 70,
  },
  containerfields: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 70,
    backgroundColor: "yellow",
  },

  containerfields1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 70,
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
