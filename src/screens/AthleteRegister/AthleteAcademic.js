import React, { useState, useCallback, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Keyboard,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ScreenNames from "../../constants/ScreenNames";
import years from "../../data/years";
import {gql, useLazyQuery, useMutation} from "@apollo/client";

// TODO move all gql constants to separate file
const GET_SCHOOLS = gql`
  query GetSchools {
    schools {
      schoolId
      name
    }
  }
`;
const ADD_ATHLETE_INFO = gql`
    mutation CreateAthlete($userId: ID!, $firstName: String!, $lastName: String!, $gender: Gender!, 
            $gpa: Float, $weight: Float, $height: Float) {
      createAthlete(user_id: $userId, first_name: $firstName, last_name: $lastName, gender: $gender, 
            gpa: $gpa, weight: $weight, height: $height) {
        userId
      }
    }
`;

const AthleteAcademic = ({ navigation, route }) => {
  const [gpa, setGPA] = useState("");

  const [openSchool, setOpenSchool] = useState(false);
  const [school, setSchool] = useState(null);
  const [schoolList, setSchoolList] = useState([]);

  const [addAthleteInfo] = useMutation(ADD_ATHLETE_INFO, {
      onError: error => console.log(error)
  });

  const [getSchools] = useLazyQuery(GET_SCHOOLS, {
    onCompleted: (data) => {
        console.log(data);
        setSchoolList(data.schools.map(({schoolId, name}) => ({
            label: name,
            value: schoolId,
        })));
    }
  });

  useEffect(() => {
    getSchools();
  }, []);

  const [openYear, setOpenYear] = useState(false);
  const [year, setYear] = useState(null);
  const [yearItems, setYearItems] = useState(years);

  const handleYearOpen = useCallback(() => {
    setOpenYear(true);
    setOpenSchool(false);
  }, []);

  const handleSchoolOpen = useCallback(() => {
    setOpenSchool(true);
    setOpenYear(false);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.navigate(ScreenNames.ATHLETE_HEIGHT_WEIGHT)}
      >
        <Text style={styles.back}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.register}>{"REGISTER"}</Text>

      <DropDownPicker
        searchable={true}
        searchPlaceholder="Search..."
        placeholder="Find School"
        open={openSchool}
        value={school}
        items={schoolList}
        setOpen={setOpenSchool}
        setValue={setSchool}
        setItems={setSchoolList}
        onOpen={handleSchoolOpen}
        zIndex={3000}
        zIndexInverse={1000}
        style={[styles.spacingBetweenHeader, styles.box, styles.pickleStyle]}
        dropDownContainerStyle={[
          styles.spacingBetweenHeader,
          styles.pickleStyle,
        ]}
      />

      <DropDownPicker
        searchable={true}
        searchPlaceholder="Search..."
        placeholder="Year"
        open={openYear}
        value={year}
        items={yearItems}
        setOpen={setOpenYear}
        setValue={setYear}
        setItems={setYearItems}
        onOpen={handleYearOpen}
        zIndex={2000}
        zIndexInverse={2000}
        style={[styles.spacingBetweenBoxes, styles.box, styles.pickleStyle]}
        dropDownContainerStyle={[
          styles.spacingBetweenBoxes,
          styles.pickleStyle,
        ]}
      />

      <TextInput
        placeholder="GPA"
        keyboardType={"numeric"}
        returnKeyLabel="Done"
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
        autoCapitalize="none"
        autoCorrect={false}
        value={gpa}
        onChangeText={setGPA}
        style={[
          styles.textBoxContainer,
          styles.textBox,
          styles.spacingBetweenBoxes,
        ]}
      />

      <TouchableOpacity
        onPress={() => {
            addAthleteInfo({
                    variables: {
                        userId: route.params.userId,
                        firstName: route.params.fullName.split(/\s+/)[0],
                        lastName: route.params.fullName.split(/\s+/)[1],
                        gender: route.params.gender.toUpperCase(),
                        // TODO propose height format change
                        height: parseInt(parseFloat(route.params.height.ft) * 30.48
                            + parseFloat(route.params.height.inch) * 2.54),
                        weight: parseInt(route.params.weight),
                        gpa: parseFloat(gpa)
                    }
                }
            ).then(res =>
                gpa !== "" && !!school && !!year
                    ? navigation.navigate(ScreenNames.ATHLETE_COMPLETE, {
                        ...route.params,
                        school: school,
                        // TODO change this to school object
                        schoolName: schoolList.filter(s => s.value === school)[0].label,
                        year: year,
                        gpa: gpa,
                    })
                    : Alert.alert("Please enter school, year and your gpa before moving to the next step!!"));
        }}
        style={[
          styles.nextBtn,
          gpa !== "" && !!school && !!year
            ? { backgroundColor: "#000000", borderColor: "#000000" }
            : { backgroundColor: "#888888", borderColor: "#888888" },
        ]}
      >
        <Text style={styles.nextText}>{"Next"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AthleteAcademic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  backContainer: {
    position: "absolute",
    left: 42,
    top: 40,
  },

  back: {
    fontSize: 30,
    fontWeight: "bold",
  },

  register: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
    marginTop: 54,
    alignSelf: "center",
  },

  textBox: {
    color: "#555555",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
    marginHorizontal: 69,
    paddingLeft: 17,
  },

  textBoxContainer: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 6,
    height: 37,
    backgroundColor: "#FFFFFF",
  },

  spacingBetweenHeader: {
    marginTop: 126,
  },

  spacingBetweenBoxes: {
    marginTop: 46,
  },

  // TODO: think a better way to style this.
  box: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    height: 37,
  },

  pickleStyle: {
    width: Dimensions.get("screen").width - 69 * 2,
    marginLeft: 69,
  },

  nextBtn: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 69,
    marginTop: 312,
    height: 40,
  },

  nextText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
  },
});
