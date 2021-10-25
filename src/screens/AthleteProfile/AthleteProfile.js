import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ScreenNames from '../ScreenNames';

const AthleteProfile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer}
                        onPress={() => navigation.navigate(ScreenNames.ATHLETE_COMPLETE_REGISTER)}>
        <Text style={styles.back}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.register}>{"COMPLETE PROFILE"}</Text>
    </View>
  )
}

export default AthleteProfile;

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

})