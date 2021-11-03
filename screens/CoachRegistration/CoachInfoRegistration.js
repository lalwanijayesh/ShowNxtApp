import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const CoachInfoRegistration = (props) => {
  const [uniVisible, setUniVisible] = useState(false);
  const [uni, setUni] = useState(null);
  const [mockUni, setMockUni] = useState([
    { label: "Northeastern", value: "Northeastern" },
    { label: "Harvard", value: "harvard" },
    { label: "Bu", value: "bu" },
  ]);

  const [sportVisible, setSportVisible] = useState(false);
  const [sport, setSport] = useState(null);
  const [mockSport, setMockSport] = useState([
    { label: "Squash", value: "squash" },
    { label: "Soccer", value: "soccer" },
  ]);

  let [jobTitle, setJobTitle] = React.useState("");

  const onUniOpen = useCallback(() => {
    setSportVisible(false);
  }, []);

  const onSportOpen = useCallback(() => {
    setUniVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.spacingToSportPicker}>
        <DropDownPicker
          searchable={true}
          searchPlaceholder="Search..."
          placeholder="Find University"
          open={uniVisible}
          value={uni}
          items={mockUni}
          setOpen={setUniVisible}
          setValue={setUni}
          setItems={setMockUni}
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

      <View style={styles.pickerSeparator} />

      <View style={styles.spacingToUniPicker}>
        <DropDownPicker
          searchable={true}
          searchPlaceholder="Search..."
          placeholder="Coaching Sport"
          open={sportVisible}
          value={sport}
          items={mockSport}
          setOpen={setSportVisible}
          setValue={setSport}
          setItems={setMockSport}
          zIndex={3000}
          zIndexInverse={1000}
          onOpen={onSportOpen}
          style={[styles.spacingToSportPicker, styles.box, styles.pickleStyle]}
          dropDownContainerStyle={[
            styles.spacingtoSportDropdown,
            styles.pickleStyle,
          ]}
        />
      </View>

      <TextInput
        style={styles.jobInput}
        onChangeText={setJobTitle}
        value={jobTitle}
        placeholder="Enter your Job Title"
      />

      {uni !== null && sport !== null && jobTitle !== "" && (
        <TouchableOpacity
          style={styles.buttonReady}
          onPress={() => {
            props.navigation.navigate("CoachPositionSelection", {
              fullName: props.route.params.fullName,
              email: props.route.params.email,
              password: props.route.params.password,
              school: props.route.paramsschool,
              sport: props.route.paramssport,
              jobTitle: props.route.paramsjobTitle,
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
    marginTop: 55,
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
    margin: 370,
    width: 237,
    backgroundColor: "#000000",
  },

  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
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

  nameInput: {
    width: 237,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    // marginTop: 100,
  },

  register: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
    // marginTop: 54,
    alignSelf: "center",
  },

  nextText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
  },

  pickerSeparator: {
    height: 50,
  },

  spacingToUniPicker: {
    // marginTop: 50,
  },

  // spacingToUniDropdown: {
  //   // marginTop: 125,
  // },

  spacingToSportPicker: {
    // marginTop: 100,
  },

  // spacingtoSportDropdown: {
  //   marginTop: 160,
  // },

  box: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    height: 37,
  },

  pickleStyle: {
    width: Dimensions.get("screen").width - 89 * 2,
    // marginLeft: 60,
  },

  text: {
    // marginTop: 22,
    marginHorizontal: 69,
    fontSize: 8,
    lineHeight: 11,
    color: "#000000",
  },
});

export default CoachInfoRegistration;
