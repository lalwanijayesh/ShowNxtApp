import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ScreenNames from '../ScreenNames';

// TODO: Replace image in the circle view
// TODO: Implement propTypes, connect to backend to get user info, using Mock to test
const AthleteProfile = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer}
                        onPress={() => navigation.navigate(ScreenNames.ATHLETE_ACADEMIC)}>
        <Text style={styles.back}>{"<"}</Text>
      </TouchableOpacity>

      <View>
        <View></View>
        <View>
          <Text>{"Name LastName"}</Text>
          <Text>{"Position"}</Text>
          <Text>{"School in School Town, State"}</Text>
        </View>
        
      </View>

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