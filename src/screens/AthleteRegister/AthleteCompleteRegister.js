import React from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';
import ScreenNames from '../ScreenNames';

const AtheleteComplte = ({navigation}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer}
                        onPress={() => navigation.navigate(ScreenNames.ATHLETE_ACADEMIC)}>
        <Text style={styles.back}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.register}>{"REGISTER"}</Text>

      <TouchableOpacity style={styles.box}
                        onPress={() => navigation.navigate(ScreenNames.ATHLETE_PROFILE)}>
        <View style={styles.btnContainer}>
          <Text style={styles.textBox}>{"Complete Athlete Profile"}</Text>
          <Text style={styles.textBox}>{">"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default AtheleteComplte;

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

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  textBox: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
    paddingLeft: 17,
  },

  box: {
    borderWidth: 1,
    borderRadius: 6,
    height: 40,
    backgroundColor: '#000000',
    marginTop: 572,
    justifyContent: 'center',
    marginLeft: 84,
    marginRight: 54,
  },
})