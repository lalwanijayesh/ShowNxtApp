import React from "react";
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
export default EmailPassScreen;
