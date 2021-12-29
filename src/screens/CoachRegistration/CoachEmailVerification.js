import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import ScreenNames from "../../constants/ScreenNames";
import Icon from "react-native-ico-material-design";

const CoachEmailVerification = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => props.navigation.navigate(ScreenNames.COACH_EMAIL_PASSWORD,
            props.route.params)}
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
        <Text style={[styles.mail, styles.mailAddress]}>{props.route.params.email}</Text>
      </Text>
      <TouchableOpacity
        style={styles.buttonReady}
        onPress={() => {
          props.navigation.navigate(
            ScreenNames.COACH_SPORT_INFO,
            props.route.params
          );
        }}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%"
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
    marginBottom: 100
  },
  mail: {
    color: '#555555',
    fontSize: 14,
    lineHeight: 16,
    marginHorizontal: 77,
    textAlign: 'center'
  },
  mailAddress: {
    fontWeight: 'bold'
  },
  buttonReady: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    marginTop: 250,
    width: 237,
    backgroundColor: "#000000",
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: '#FFFFFF'
  },
});

export default CoachEmailVerification;
