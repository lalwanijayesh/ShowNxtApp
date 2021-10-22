import React from "react";
<<<<<<< HEAD
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
=======
import { render } from "react-dom";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { ATHLETE, COACH } from "../constants/enums";

class EmailPassScreen extends React.Component {
  constructor(props) {
    super(props);

    this._setEmail = this._setEmail.bind(this);
    this._setPassword = this._setPassword.bind(this);

    this.state = {
      email: "",
      password: "",
    };

    let { userType, fullName } = props.route.params;
    this.userType = userType;
    this.fullName = fullName;
  }

  _setEmail(newEmail) {
    this.setState((state) => ({
      email: newEmail,
      password: state.password,
    }));
  }

  _setPassword(newPassword) {
    this.setState((state) => ({
      email: state.email,
      password: newPassword,
    }));
  }

  _hasSpecialCharacters() {
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

    for (let i = 0; i < this.state.password.length; i += 1) {
      let char = this.state.password[i];

      if (specialCharacters.includes(char)) {
        return true;
      }
>>>>>>> 626e6e8916b1c8775c02dcd324d0c62110419fbd
    }

    return false;
  }

  _hasNumericCharacters() {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (let i = 0; i < this.state.password.length; i += 1) {
      let char = this.state.password[i];

      if (numbers.includes(char)) {
        return true;
      }
    }

    return false;
  }

<<<<<<< HEAD
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

=======
  _isPasswordSufficient() {
    return (
      this._hasNumericCharacters() &&
      this._hasSpecialCharacters() &&
      this.state.password.length >= 8
    );
  }

  render() {
    return (
      <View>
        <TextInput
          onChangeText={this._setEmail}
          value={this.state.email}
          autoCompleteType="email"
          placeholder="Email"
        />

        <TextInput
          onChangeText={this._setPassword}
          value={this.state.password}
          autoCompleteType="password"
          secureTextEntry={true}
          placeholder="Password"
        />

        {this.state.email !== "" &&
          this.state.password !== "" &&
          this._isPasswordSufficient() && (
            <TouchableOpacity>
              <Text>Next</Text>
            </TouchableOpacity>
          )}
      </View>
    );
  }
}
>>>>>>> 626e6e8916b1c8775c02dcd324d0c62110419fbd
export default EmailPassScreen;
