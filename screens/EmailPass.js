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
      <View style={styles.container}>
        <TextInput
        style={styles.emailInput}
          onChangeText={this._setEmail}
          value={this.state.email}
          autoCompleteType="email"
          placeholder="Email"
        />

        <TextInput
        style={styles.passwordInput}
          onChangeText={this._setPassword}
          value={this.state.password}
          autoCompleteType="password"
          secureTextEntry={true}
          placeholder="Password"
        />

        <View style={styles.passwordRequirementsContainer}>
          <Text style={styles.passwordRequirements}>Password must include the following:</Text>

          {this.state.password.length >= 8 ? (
            <Text style={styles.passwordRequirements}>✅ at least 8 characters</Text>
          ) : (
            <Text style={styles.passwordRequirements}>❌ at least 8 characters</Text>
          )}

          {this._hasNumericCharacters() ? (
            <Text style={styles.passwordRequirements}>✅ 1 numeric character</Text>
          ) : (
            <Text style={styles.passwordRequirements}>❌ 1 numeric character</Text>
          )}

          {this._hasSpecialCharacters() ? (
            <Text style={styles.passwordRequirements}>✅ 1 special character</Text>
          ) : (
            <Text style={styles.passwordRequirements}>❌ 1 special character</Text>
          )}
        </View>

        {this.state.email !== "" &&
          this.state.password !== "" &&
          this._isPasswordSufficient() && (
            <TouchableOpacity
            style={styles.buttonReady} onPress={() => {
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
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          )}
      </View>
    );
  }
}

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
