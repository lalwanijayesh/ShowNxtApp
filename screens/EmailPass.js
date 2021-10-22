import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { ATHLETE, COACH } from "../constants/enums";


const isPasswordSufficient = (password) => {
  let hasSpecial = false;
  let hasNumeric = false;

  const specialCharacters = [
    " ",
    "!",
    '"',
    "#",
    "$",
    "%",
    "&",
    "`",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    ":",
    ";",
    "<",
    ">",
    "=",
    "?",
    "@",
    "[",
    "]",
    "^",
    "_",
    "`",
    "{",
    "}",
    "|",
    "~",
  ];

  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  for (let i = 0; i < password.length; i += 1) {
    let char = password[i];

    if (specialCharacters.includes(char)) {
      hasSpecial = true;
    }

    if (numbers.includes(char)) {
      hasNumeric = true;
    }
  }

  return hasSpecial && hasNumeric && password.length >= 8;
};

const EmailPassScreen = ({ route, navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  let { userType, fullName } = route.params;

  return (
    <View style={styles.container}>
      <TextInput 
      style={styles.emailInput}
      onChangeText={setEmail} 
      value={email} 
      placeholder="Email" />


      <TextInput
        style={styles.passwordInput}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />




<Text style={styles.passwordRequirements}>Password must include the following:</Text>
<Text style={styles.passwordRequirements1}>at least 8 charaters</Text>
<Text style={styles.passwordRequirements1}>numeric symbol</Text>
<Text style={styles.passwordRequirements1}>special character</Text>

      {email !== "" && password !== "" && isPasswordSufficient(password) && (
        <TouchableOpacity style={styles.buttonReady}
        onPress={() => {navigation.navigate("VerificationScreen", { COACH, fullName });
        }}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },

  emailInput: {
    width: 237,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    marginTop: 100,
  },

  passwordInput: {
    width: 237,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },

  buttonReady: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 20,
    width: 237,
    backgroundColor: "#fff",
  },

  passwordRequirements: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  passwordRequirements1: {
    fontWeight: "normal",
    textAlign: "right",
    marginTop: 10,
  },

  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },



});

export default EmailPassScreen;
