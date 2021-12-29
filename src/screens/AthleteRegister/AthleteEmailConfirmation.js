import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import ScreenNames from '../../constants/ScreenNames';
import Icon from "react-native-ico-material-design";

// TODO Confirm email verified before moving to next screen
const EmailConfirmation = ({navigation, route}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
          style={styles.backContainer}
          onPress={() =>
              navigation.navigate(ScreenNames.EMAIL_PASSWORD, route.params)}
      >
        <Icon
            name="left-arrow-key"
            height={15}
            width={15}
            color="black"
        />
      </TouchableOpacity>

      <Text style={styles.register}>{"REGISTER"}</Text>
      <Text style={styles.mail}>
        {"Use verification link at provided email: "}
        <Text style={[styles.mail, styles.mailAddress]}>{route.params.email}</Text>
      </Text>

      <TouchableOpacity onPress={() =>
          navigation.navigate(ScreenNames.ATHLETE_SPORT_INFO,
              route.params)}
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
    position: "absolute",
    left: 40,
    top: 60,
  },
  register: {
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    padding: 10,
    marginTop: 50,
  },
  mail: {
    color: '#555555',
    fontSize: 14,
    lineHeight: 16,
    marginHorizontal: 77,
    textAlign: 'center',
    marginTop: 100,
  },
  mailAddress: {
    fontWeight: 'bold'
  },
  nextBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 69,
    marginTop: 350,
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