import React, {useState} from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet, Platform } from 'react-native';
import ScreenNames from '../ScreenNames';

const AthleteHeightWeight = ({navigation}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer}
                        onPress={() => navigation.navigate(ScreenNames.ATHLETE_SPORT_INFO)}>
        <Text style={styles.back}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.register}>{"REGISTER"}</Text>

      <TextInput placeholder="Height" 
                 autoCapitalize="none"
                 autoCorrect={false}
                 style={[styles.box, styles.textBox, styles.spacingBetweenHeader]} />

      <TextInput placeholder="Weight"
                 autoCapitalize="none"
                 autoCorrect={false}
                 style={[styles.box, styles.textBox, styles.spacingBetweenBoxes]} />

      <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.ATHLETE_ACADEMIC)}
                        style={styles.nextContainer}>
        <Text>{"Next >"}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AthleteHeightWeight;

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

  textBox: {
    color: '#555555',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
    marginHorizontal: 69,
    paddingLeft: 17,
  },

  box: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 6,
    height: 37,
    backgroundColor: '#FFFFFF',
  },

  spacingBetweenHeader: {
    marginTop: 126,
  },

  spacingBetweenBoxes: {
    marginTop: 46,
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
  }

})