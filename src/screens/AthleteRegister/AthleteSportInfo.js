import React, {useCallback, useState} from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Dimensions, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ScreenNames from '../ScreenNames';
import {generateSportList, generateListOfPositionBySport, generateInfo} from '../../datas/mockSports/generateMockSports';

const AthleteSportInfo = ({navigation}) => {

  const [openSport, setOpenSport] = useState(false);
  const [openPosition, setOpenPosition] = useState(false);

  const [sport, setSport] = useState(null);
  const [position, setPosition] = useState(null);

  const [mockSport, setMockSports] = useState(generateInfo(generateSportList()));
  // TODO: find the ways to show positions depending on the sport.
  let k = generateInfo(generateListOfPositionBySport(sport));
  const [mockPosition, setMockPositon] = useState();

  // const handleSetSport = (sport) => {
  //   setSport(sport); 
  //   k = generateInfo(generateListOfPositionBySport(sport));
  // }

  const handleSportOpen = useCallback(() => {
    setOpenSport(true);
    setOpenPosition(false);
  }, []);

  const handlePositionOpen = useCallback(() => {
    setOpenSport(false);
    setOpenPosition(true);
  }, []);

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backContainer}
                      onPress={() => navigation.navigate(ScreenNames.EMAIL_CONFIRMATION)}>
      <Text style={styles.back}>{"<"}</Text>
    </TouchableOpacity>

    <Text style={styles.register}>{"REGISTER"}</Text>

    <DropDownPicker  
      searchable={true}
      searchPlaceholder="Search..."
      placeholder="Sport"
      open={openSport}
      value={sport}
      items={mockSport}
      onOpen={handleSportOpen}
      setOpen={setOpenSport}
      setValue={handleSetSport}
      setItems={setMockSports}
      zIndex={3000}
      zIndexInverse={1000}
      style={[styles.spacingToHeader, styles.box, styles.pickleStyle]}
      dropDownContainerStyle={[styles.spacingToHeader, styles.pickleStyle]}
    />

    <DropDownPicker  
      searchable={true}
      searchPlaceholder="Search..."
      zIndex={2000}
      zIndexInverse={2000}
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
                        !!position && !!sport ?
                        navigation.navigate(ScreenNames.ATHLETE_HEIGHT_WEIGHT) : 
                        Alert.alert("Please choose sport and position before moving to the next step!!")
                      }}
                      style={[styles.nextBtn, !!position && !!sport ? {backgroundColor: '#000000'} : {backgroundColor: '#888888'}]}>
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