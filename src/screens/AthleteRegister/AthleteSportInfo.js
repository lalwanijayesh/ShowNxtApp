import React, {useCallback, useState} from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ScreenNames from '../ScreenNames';

const AthleteSportInfo = ({navigation}) => {

  const [openSport, setOpenSport] = useState(false);
  const [openPosition, setOpenPosition] = useState(false);
  const [sport, setSport] = useState(null);
  const [position, setPosition] = useState(null);
  
  const [mockSport, setMockSports] = useState([
    {label: 'Soccer', value:'soccer'},
    {label: 'Football', value: 'football'},
  ]);
  const [mockPosition, setMockPositon] = useState([
    {label: 'P1', value:'1'},
    {label: 'P2', value: '2'},
  ]);

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
                      onPress={() => navigation.navigate(ScreenNames.USERNAME_PASSWORD)}>
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
      setValue={setSport}
      setItems={setMockSports}
      zIndex={3000}
      zIndexInverse={1000}
      style={[styles.spacingToHeader, styles.box]}
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
      style={[styles.spacingBetween, styles.box]}/>

    {!!sport && !!position && 
      <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.ATHLETE_HEIGHT_WEIGHT)}
                        style={styles.nextContainer}>
        <Text>{"Next >"}</Text>
      </TouchableOpacity>}
  </View>
  );
};

export default AthleteSportInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  pickleContainer: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 6,
    height: 37,
    marginLeft: 69,
    marginRight: 69,
    justifyContent: 'center'
  },

  nextContainer: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 6,
    height: 37,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
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
  }

})