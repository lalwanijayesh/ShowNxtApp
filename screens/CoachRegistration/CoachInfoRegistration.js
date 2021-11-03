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
  let [jobTitle, setJobTitle] = React.useState("");
  const [uniType, setUniType] = useState(false);
  const [uni, setUni] = useState(null);
  const [mockUni, setMockUni] = useState([
    { label: "Northeastern", value: "Northeastern" },
    { label: "Harvard", value: "harvard" },
    { label: "Bu", value: "bu" },
  ]);
  const [sportType, setSportType] = useState(false);
  const [sport, setSport] = useState(null);
  const [mockSport, setMockSport] = useState([
    { label: "Squash", value: "squash" },
    { label: "Soccer", value: "soccer" },
  ]);

  const handleSportOpen = useCallback(() => {
    setJobTitle(true);
    setUniTitle(false);
  }, []);

  return (
    <View style={styles.container}>
      <DropDownPicker
        searchable={true}
        searchPlaceholder="Search..."
        placeholder="Find University"
        open={uniType}
        value={uni}
        items={mockUni}
        setOpen={setUniType}
        setValue={setUni}
        setItems={setMockUni}
        zIndex={3000}
        zIndexInverse={1000}
        style={[styles.spacingToHeader1, styles.box, styles.pickleStyle]}
        dropDownContainerStyle={[styles.spacingToHeader, styles.pickleStyle]}
      />
      <DropDownPicker
        searchable={true}
        searchPlaceholder="Search..."
        placeholder="Coaching Sport"
        open={sportType}
        value={sport}
        items={mockSport}
        setOpen={setSportType}
        setValue={setSport}
        setItems={setMockSport}
        zIndex={3000}
        zIndexInverse={1000}
        style={[styles.spacingToHeader1, styles.box, styles.pickleStyle]}
        dropDownContainerStyle={[styles.spacingToHeader, styles.pickleStyle]}
      />

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
    marginTop: 100,
  },

  register: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
    marginTop: 54,
    alignSelf: "center",
  },

  nextText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
  },

  spacingToHeader: {
    marginTop: 126,
  },

  spacingToHeader1: {
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
    marginLeft: 60,
  },

  text: {
    marginTop: 22,
    marginHorizontal: 69,
    fontSize: 8,
    lineHeight: 11,
    color: "#000000",
  },
});

export default CoachInfoRegistration;
