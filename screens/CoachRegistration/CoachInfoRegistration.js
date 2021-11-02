import React, {useCallback, useState} from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

const CoachInfoRegistration = (props) => {
  let [jobTitle, setJobTitle] = React.useState("");
  const [uniType, setUniType] = useState(false);
  const [uni, setUni] = useState(null);
  const [mockUni, setMockUni] = useState([
    {label: 'Northeastern', value: 'Northeastern'},
    {label: 'Harvard', value: 'harvard'}
  ]);
  const [sportType, setSportType] = useState(false);
  const [sport, setSport] = useState(null);
  const [mockSport, setMockSport] = useState([
    {label: 'Squash', value: 'squash'},
    {label: 'Soccer', value: 'soccer'}
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker  
      searchable={true}
      searchPlaceholder="Search..."
      placeholder="Find University"
      open ={uniType}
      value={uni}
      items={mockUni}
      setOpen={setUniType}
      setValue={setUni}
      setItems={setMockUni}
      zIndex={3000}
      zIndexInverse={1000}
      style={[styles.spacingToHeader, styles.box, styles.pickleStyle]}
      dropDownContainerStyle={[styles.spacingToHeader, styles.pickleStyle]}
    />
      <DropDownPicker  
      searchable={true}
      searchPlaceholder="Search..."
      placeholder="Coaching Sport"
      open ={sportType}
      value={sport}
      items={mockSport}
      setOpen={setSportType}
      setValue={setSport}
      setItems={setMockSport}
      zIndex={3000}
      zIndexInverse={1000}
      style={[styles.spacingToHeader, styles.box, styles.pickleStyle]}
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

  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
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

  typePicker: {
    width: 237,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
  },

  backContainer: {
    position: 'absolute',
    left: 42,
    top: 40,
  },

  back: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  register: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16, 
    marginTop: 54,
    alignSelf: 'center',
  },

  nextBtn: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 69,
    marginTop: 312,
    height: 40,
  },

  nextText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
  },

  spacingToHeader: {
    marginTop: 126,
    
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
    width: Dimensions.get('screen').width - 69*2,
    marginLeft: 69,
  },

  text: {
    marginTop: 22,
    marginHorizontal: 69,
    fontSize: 8,
    lineHeight: 11,
    color: '#000000',
  }


});

export default CoachInfoRegistration;
