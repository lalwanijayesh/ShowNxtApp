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
import serverUrl from "../../constants/graphql";
import ScreenNames from "../../constants/ScreenNames";

import { gql, useQuery } from "@apollo/client";

const GET_SCHOOLS_AND_SPORTS = gql`
  query GetSchoolsAndSports {
    schools {
      schoolId
      name
    }

    sports {
      sportId
      name
      gender
    }
  }
`;

const CoachInfoRegistration = (props) => {
  const [uniVisible, setUniVisible] = useState(false);
  const [currentUni, setCurrentUni] = useState(null);
  const [uniList, setUniList] = useState([]);

  const [sportVisible, setSportVisible] = useState(false);
  const [sport, setSport] = useState(null);
  const [mockSport, setMockSport] = useState([
    { label: "Squash", value: "squash" },
    { label: "Soccer", value: "soccer" },
  ]);

  const [jobTitle, setJobTitle] = React.useState("");
  const [currentSport, setCurrentSport] = useState(null);
  const [sportList, setSportList] = useState([]);

  const onUniOpen = useCallback(() => {
    setSportVisible(false);
  }, []);

  const onSportOpen = useCallback(() => {
    setUniVisible(false);
  }, []);

  let [jobTitle, setJobTitle] = React.useState("");

  const { loading, error, data } = useQuery(GET_SCHOOLS_AND_SPORTS);

  if (uniList.length == 0) {
    if (loading) return <Text>Loading</Text>;
    if (error) return <Text>Error</Text>;

    setUniList(
      data.schools.map(({ schoolId, name }) => ({
        label: name,
        value: schoolId,
      }))
    );

    setSportList(
      data.sports.map(({ sportId, name, gender }) => ({
        label: name + " [" + gender + "]",
        value: sportId,
      }))
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.marginTop1} />

      <DropDownPicker
        searchable={true}
        searchPlaceholder="Search..."
        placeholder="Find University"
        open={uniVisible}
        value={currentUni}
        items={uniList}
        setOpen={setUniVisible}
        setValue={setCurrentUni}
        setItems={setUniList}
        zIndex={3001}
        zIndexInverse={1001}
        onOpen={onUniOpen}
        style={[styles.spacingToUniPicker, styles.box, styles.pickleStyle]}
        dropDownContainerStyle={[
          styles.spacingToUniDropdown,
          styles.pickleStyle,
        ]}
      />

      <View style={styles.pickerSeparator} />

      <DropDownPicker
        searchable={true}
        searchPlaceholder="Search..."
        placeholder="Coaching Sport"
        open={sportVisible}
        value={currentSport}
        items={sportList}
        setOpen={setSportVisible}
        setValue={setCurrentSport}
        setItems={setSportList}
        zIndex={3000}
        zIndexInverse={1000}
        onOpen={onSportOpen}
        style={[styles.spacingToSportPicker, styles.box, styles.pickleStyle]}
        dropDownContainerStyle={[
          styles.spacingtoSportDropdown,
          styles.pickleStyle,
        ]}
      />

      <TextInput
        style={styles.jobInput}
        onChangeText={setJobTitle}
        value={jobTitle}
        placeholder="Enter your Job Title"
      />

      <View style={styles.progressContainer}>
        <View style={styles.circle}>
          <Text style={styles.oneText}>1</Text>
        </View>

        <View style={styles.dash}></View>

        <View style={styles.circle2}>
          <Text style={styles.oneText}>2</Text>
        </View>
      </View>

      <View style={styles.textUnderCircles}>
        <View>
          <Text style={styles.SandRText}>Sports</Text>
        </View>
        <View>
          <Text style={styles.SandRText}>Position</Text>
        </View>
      </View>

      {currentUni !== null && currentSport !== null && jobTitle !== "" && (
        <TouchableOpacity
          style={styles.buttonReady}
          onPress={() => {
            props.navigation.navigate(ScreenNames.COACH_POSITION_SELECTION, {
              fullName: props.route.params.fullName,
              email: props.route.params.email,
              password: props.route.params.password,
              schoolId: currentUni,
              sportId: currentSport,
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
  progressContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 255,
  },

  textUnderCircles: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: -275,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "grey",
    margin: 5,
    display: "flex",
    alignItems: "center",
  },

  circle2: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "silver",
    margin: 5,
  },
  oneText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  dash: {
    width: 30,
    height: 2,
    backgroundColor: "silver",
    textAlign: "center",
  },

  SandRText: {
    color: "black",
    fontSize: 10,
    textAlign: "center",
    margin: 20,
  },

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
    margin: 89,
  },

  buttonReady: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 280,
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
    //marginTop: 100,
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

  marginTop1: {
    height: 100,
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
    // width: Dimensions.get("screen").width - 89 * 2,
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
