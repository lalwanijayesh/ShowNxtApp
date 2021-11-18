import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import ScreenNames from '../../constants/ScreenNames';

// TODO: store the email through Firebase -> send to user -> implement email here
// currently this is a just simple view component
const EmailConfirmation = ({navigation}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer} onPress={() => navigation.navigate(ScreenNames.EMAIL_PASSWORD)}>
        <Text style={styles.back}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.register}>{"REGISTER"}</Text>
       
      <Text style={styles.mail}>{"Use the verification link at the provided email."}</Text>

      <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.ATHLETE_SPORT_INFO)} 
                        style={styles.nextBtn}>
        <Text style={styles.nextText}>{"Next"}</Text>
      </TouchableOpacity>
      
    </View>
  ) 
}

export default EmailConfirmation;

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

  mail: {
    color: '#555555',
    fontSize: 14,
    lineHeight: 16,
    marginHorizontal: 77,
    textAlign: 'center',
    marginTop: 170,
  },

  nextBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 69,
    marginTop: 312,
    backgroundColor: '#000000',
    height: 40,
    borderRadius: 6,
  },

  nextText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
  },
});