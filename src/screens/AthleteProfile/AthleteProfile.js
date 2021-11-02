import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ScreenNames from '../ScreenNames';

// TODO: Replace image in the circle view
// TODO: This screen is currently a pure UI, it will be fixed later to use to connect back-end for user data. 
const AthleteProfile = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer}
                        onPress={() => navigation.navigate(ScreenNames.ATHLETE_ACADEMIC)}>
        <Text style={styles.back}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.register}>{"COMPLETE PROFILE"}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.avatar}></View>
        <View>
          <Text style={styles.textName}>{"Name LastName"}</Text>
          <Text style={[styles.spacingBetweenText, styles.textInfo]}>{"Position"}</Text>
          <Text style={styles.textInfo}>{"School in School Town, State"}</Text>
        </View>
      </View>

      <Text style={styles.videoTitle}>{"Videos"}</Text>

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

  infoContainer: {
    marginTop: 40,
    flexDirection: 'row',
    marginHorizontal: 32,
  },

  avatar: {
    width: 100,
    height: 100,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 34,
  },

  textName: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
    color: '#000000',
  },

  spacingBetweenText: {
    marginTop: 30,
  },

  textInfo: {
    color: '#555555',
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'bold',
  },

  videoTitle: {
    marginTop: 57,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 16,
    color: '#000000',
    marginLeft: 34,
  }
})