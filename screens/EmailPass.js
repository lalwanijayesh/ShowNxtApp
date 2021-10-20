import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
    <View>
      <TextInput onChangeText={setEmail} value={email} placeholder="Email" />

      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />

      {email !== "" && password !== "" && isPasswordSufficient(password) && (
        <TouchableOpacity>
          <Text>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default EmailPassScreen;
