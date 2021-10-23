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

        <View style={style.passwordRequirementsContainer}>
          <Text>password must include the following:</Text>

          {this.state.password.length >= 8 ? (
            <Text>✓ at least 8 characters</Text>
          ) : (
            <Text>X at least 8 characters</Text>
          )}

          {this._hasNumericCharacters() ? (
            <Text>✓ 1 numeric character</Text>
          ) : (
            <Text>X 1 numeric character</Text>
          )}

          {this._hasSpecialCharacters() ? (
            <Text>✓ 1 special character</Text>
          ) : (
            <Text>X 1 special character</Text>
          )}
        </View>

        {this.state.email !== "" &&
          this.state.password !== "" &&
          this._isPasswordSufficient() && (
            <TouchableOpacity
              onPress={() => {
                if (this.userType === COACH) {
                  this.props.navigation.navigate("Verification", {
                    fullName: this.fullName,
                    email: this.state.email,
                    password: this.state.password,
                  });
                } else {
                  // TODO: redirect to next Athlete screen
                }
              }}
            >
              <Text>Next</Text>
            </TouchableOpacity>
          )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  passwordRequirementsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export default EmailPassScreen;
