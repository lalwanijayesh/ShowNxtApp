import React, {useCallback, useState} from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Dimensions, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ScreenNames from '../../constants/ScreenNames';
import {generateSportList, generateListOfPositionBySport, generateInfo} from '../../data/mockSports/generateMockSports';

const AthleteSportInfo = ({navigation}) => {

  const [openGender, setOpenGender] = useState(false);
  const [openSport, setOpenSport] = useState(false);
  const [openPosition, setOpenPosition] = useState(false);

  const [gender, setGender] = useState(null);
  const [sport, setSport] = useState(null);
  const [position, setPosition] = useState(null);

  const [genderItem, setGenderItem] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ]);
  // TODO: rename those mock 
  const [mockSport, setMockSports] = useState(generateInfo(generateSportList()));
  const [mockPosition, setMockPositon] = useState([{
    label: 'None', value: 'None'
  }]);

  /**
   * close other dropdowns when the gender is opened.
   */
   const handleGenderOpen = useCallback(() => {
    setOpenGender(true);
    setOpenPosition(false);
    setOpenSport(false);
  }, []);

  /**
   * close other dropdowns when the sport is opened.
   */
  const handleSportOpen = useCallback(() => {
    setOpenSport(true);
    setOpenPosition(false);
    setOpenGender(false);
  }, []);

  /**
   * close other dropdowns when the position is opened.
   */
  const handlePositionOpen = useCallback(() => {
    setOpenSport(false);
    setOpenPosition(true);
    setOpenGender(false);
    setMockPositon(generateInfo(generateListOfPositionBySport(sport)));
  }, [sport]);

  // TODO: fix when the user changes the sport the position will be changed as well and Next button will be disabled.
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backContainer}
                      onPress={() => navigation.navigate(ScreenNames.EMAIL_CONFIRMATION)}>
      <Text style={styles.back}>{"<"}</Text>
    </TouchableOpacity>

    <Text style={styles.register}>{"REGISTER"}</Text>

    <DropDownPicker  
      placeholder="Gender"
      open={openGender}
      value={gender}
      items={genderItem}
      onOpen={handleGenderOpen}
      setOpen={setOpenGender}
      setValue={setGender}
      setItems={setGenderItem}
      zIndex={3000}
      zIndexInverse={1000}
      style={[styles.spacingToHeader, styles.box, styles.pickleStyle]}
      dropDownContainerStyle={[styles.spacingToHeader, styles.pickleStyle]}
    />

    <DropDownPicker  
      searchable={true}
      searchPlaceholder="Search..."
      placeholder="Sport"
      open={openSport}
      value={sport}
      items={mockSport}
      onOpen={handleSportOpen}
      setOpen={setOpenSport}
      setValue={setSport}
      setItems={setMockSports}
      zIndex={2000}
      zIndexInverse={2000}
      style={[styles.spacingBetween, styles.box, styles.pickleStyle]}
      dropDownContainerStyle={[styles.spacingBetween, styles.pickleStyle]}
    />

    <DropDownPicker  
      searchable={true}
      searchPlaceholder="Search..."
      zIndex={1000}
      zIndexInverse={3000}
      placeholder="Position"
      open={openPosition}
      value={position}
      items={mockPosition}
      onOpen={handlePositionOpen}
      setOpen={setOpenPosition}
      setValue={setPosition}
      setItems={setMockPositon}
      style={[styles.spacingBetween, styles.box, styles.pickleStyle]}
      dropDownContainerStyle={[styles.spacingBetween, styles.pickleStyle]}
    />

    <Text style={styles.text}>{'Play more than one position or more than one sport? You can add more once you finish you profile.'}</Text>

    <TouchableOpacity onPress={() => {
                        gender && position && sport ?
                        navigation.navigate(ScreenNames.ATHLETE_HEIGHT_WEIGHT) :
                        Alert.alert("Please choose gender, sport and position before moving to the next step!!")
                      }}
                      style={[styles.nextBtn, gender && position && sport ? {backgroundColor: '#000000', borderColor: '#000000',} : {backgroundColor: '#888888', borderColor: '#888888',}]}>
      <Text style={styles.nextText}>{"Next"}</Text>
    </TouchableOpacity>
  </View>
  );
};

export default AthleteSportInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 69,
    marginTop: 265,
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

  // TODO: think a better way to style this.
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

})