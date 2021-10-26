import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { COACH, ATHLETE } from "../constants/enums";

const hasSpecialCharacters = (password) => {
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

  for (let i = 0; i < password.length; i += 1) {
    let char = password[i];

    if (specialCharacters.includes(char)) {
      return true;
    }
  }

  return false;
};

const hasNumericCharacters = (password) => {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  for (let i = 0; i < password.length; i += 1) {
    let char = password[i];

    if (numbers.includes(char)) {
      return true;
    }
  }

  return false;
};

const isPasswordSufficient = (password) => {
  return (
    password.length >= 8 &&
    hasNumericCharacters(password) &&
    hasSpecialCharacters(password)
  );
};

const EmailPassScreen = (props) => {
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");

  let { userType, fullName } = props.route.params;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.emailInput}
        onChangeText={setEmail}
        value={email}
        autoCompleteType="email"
        placeholder="Email"
      />

      <TextInput
        style={styles.passwordInput}
        onChangeText={setPassword}
        value={password}
        autoCompleteType="password"
        secureTextEntry={true}
        placeholder="Password"
      />

      <View style={styles.passwordRequirementsContainer}>
        <Text style={styles.passwordRequirements}>
          Password must include the following:
        </Text>

        {password.length >= 8 ? (
          <Text style={styles.passwordRequirements}>
            ✅ at least 8 characters
          </Text>
        ) : (
          <Text style={styles.passwordRequirements}>
            ❌ at least 8 characters
          </Text>
        )}

        {hasNumericCharacters(password) ? (
          <Text style={styles.passwordRequirements}>
            ✅ 1 numeric character
          </Text>
        ) : (
          <Text style={styles.passwordRequirements}>
            ❌ 1 numeric character
          </Text>
        )}

        {hasSpecialCharacters(password) ? (
          <Text style={styles.passwordRequirements}>
            ✅ 1 special character
          </Text>
        ) : (
          <Text style={styles.passwordRequirements}>
            ❌ 1 special character
          </Text>
        )}
      </View>

      {email !== "" && password !== "" && isPasswordSufficient(password) && (
        <TouchableOpacity
          style={styles.buttonReady}
          onPress={() => {
            if (userType === COACH) {
              props.navigation.navigate("Verification", {
                fullName: fullName,
                email: email,
                password: password,
              });
            } else {
              // TODO: redirect to next Athlete screen
            }
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  passwordRequirementsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

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
