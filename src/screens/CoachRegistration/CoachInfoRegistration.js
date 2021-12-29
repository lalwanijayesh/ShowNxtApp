import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ScreenNames from "../../constants/ScreenNames";

import { gql, useQuery } from "@apollo/client";
import Icon from "react-native-ico-material-design";

const GET_SCHOOLS_AND_SPORTS = gql`
  query GetSchoolsAndSports {
    schools {
      schoolId
      name
    }
    sports {
      sportId
      sportName
      gender
    }
  }
`;

const CoachInfoRegistration = (props) => {
  const [uniVisible, setUniVisible] = useState(false);
  const [currentUni, setCurrentUni] = useState(null);
  const [uniList, setUniList] = useState([]);

  const [sportVisible, setSportVisible] = useState(false);
  const [jobTitle, setJobTitle] = React.useState("");
  const [currentSport, setCurrentSport] = useState(null);
  const [sportList, setSportList] = useState([]);

  const onUniOpen = useCallback(() => {
    setSportVisible(false);
  }, []);

  const onSportOpen = useCallback(() => {
    setUniVisible(false);
  }, []);

  const { loading, error, data } = useQuery(GET_SCHOOLS_AND_SPORTS);

  if (uniList.length === 0) {
    if (loading) return <Text style={{textAlign: 'center'}}>Loading</Text>;
    if (error) return <Text style={{textAlign: 'center'}}>Error</Text>;

    setUniList(
      data.schools.map(({ schoolId, name }) => ({
        label: name,
        value: schoolId,
      }))
    );

    setSportList(
      data.sports.map(({ sportId, sportName, gender }) => ({
        label: sportName + " [" + gender + "]",
        value: sportId,
      }))
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
          style={styles.backContainer}
          onPress={() => props.navigation.navigate(ScreenNames.COACH_VERIFICATION,
              props.route.params)}
      >
        <Icon
            name="left-arrow-key"
            height={15}
            width={15}
            color="black"
        />
      </TouchableOpacity>
      <Text style={styles.register}>{"REGISTER"}</Text>

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
        style={[styles.box, styles.pickerStyle]}
        dropDownContainerStyle={styles.pickerStyle}
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
        style={[styles.box, styles.pickerStyle]}
        dropDownContainerStyle={styles.pickerStyle}
      />

      <TextInput
        style={styles.jobInput}
        onChangeText={setJobTitle}
        value={jobTitle}
        placeholder="Job Title"
      />

      <View style={styles.progressContainer}>
        <View style={styles.circle}>
          <Text style={styles.oneText}>{"1"}</Text>
        </View>

        <View style={styles.dash}>
        </View>

        <View style={styles.circle2}>
          <Text style={styles.oneText}>{"2"}</Text>
        </View>
      </View>

      <View style={styles.textUnderCircles}>
        <View>
          <Text style={styles.SandRText}>Sport</Text>
        </View>
        <View>
          <Text style={styles.SandRText}>Positions</Text>
        </View>
      </View>

      {currentUni !== null && currentSport !== null && jobTitle !== "" &&
        <TouchableOpacity
          style={styles.buttonReady}
          onPress={() => {
            props.navigation.navigate(ScreenNames.COACH_POSITION_SELECTION, {
              ...props.route.params,
              schoolId: currentUni,
              sportId: currentSport,
              jobTitle: jobTitle,
            });
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 180,
  },
  backContainer: {
    position: "absolute",
    left: 40,
    top: 60,
  },
  register: {
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    padding: 10,
    marginTop: 50,
  },
  back: {
    fontSize: 30,
    fontWeight: "bold",
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
    margin: 8,
    display: "flex",
    alignItems: "center"
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
    fontSize: 22,
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
    padding: 20,
    marginTop: 80
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
    backgroundColor: '#ffffff'
  },
  buttonReady: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    marginTop: 290,
    width: 237,
    backgroundColor: "#000000",
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  pickerSeparator: {
    height: 50,
  },
  marginTop1: {
    height: 100,
  },
  box: {
    borderRadius: 6,
    height: 37,
  },
  pickerStyle: {
    width: 237,
    marginLeft: 69
  },
});

export default CoachInfoRegistration;
