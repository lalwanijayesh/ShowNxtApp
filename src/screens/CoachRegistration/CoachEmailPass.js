import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import firebase from "../../firebase/firebase";
import { COACH } from "../../constants/enums";
import ScreenNames from "../../constants/ScreenNames";
import {gql, useMutation} from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $type: UserType!) {
    createUser(email: $email, type: $type) {
      id
    }
  }
`;

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

  const [createUser] = useMutation(CREATE_USER, {
    onError: error => {
      Alert.alert("An error occurred during registration. Please contact administrator.");
    }
  });

  const registerUser = () => {
    if (email && !isPasswordSufficient(password)) {
      Alert.alert("Please enter valid email and password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
        createUser({variables: {email: email, type: COACH.toUpperCase()}}).then(res => {
          console.log("User created successfully with id " + res.data.createUser.id);
          userCredential.user.sendEmailVerification()
              .then(() => {
                props.navigation.navigate(ScreenNames.COACH_VERIFICATION, {
                  fullName: fullName,
                  email: email,
                  userId: res.data.createUser.id
                });
              })
              .catch((error) => Alert.alert("An error occurred while sending verificaton email!"));
        })
      }).catch((error) => Alert.alert(error.message));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() =>
          props.navigation.navigate(ScreenNames.ATHLETE_COACH_SELECTION)
        }
      >
        <Text style={styles.back}>{"<"}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.emailInput}
        onChangeText={setEmail}
        value={email}
        autoCompleteType="email"
        placeholder="Enter email"
        autoCorrect={false}
      />
      <View style={styles.checkContainer}>
        <Text style={styles.emailvalid}>Please use a valid email.</Text>
      </View>

      <TextInput
        style={styles.passwordInput}
        onChangeText={setPassword}
        value={password}
        autoCompleteType="password"
        secureTextEntry={true}
        placeholder="Password"
        autoCorrect={false}
      />

      <View style={styles.passwordRequirementsContainer}>
        <Text style={styles.passwordRequirements}>
          Password must include the following:
        </Text>

        {password.length >= 8 ? (
          <Text style={styles.passwordRequirements}>
            ✓ at least 8 characters
          </Text>
        ) : (
          <Text style={styles.passwordRequirements}>
            ✕ at least 8 characters
          </Text>
        )}

        {hasNumericCharacters(password) ? (
          <Text style={styles.passwordRequirements}>✓ 1 numeric character</Text>
        ) : (
          <Text style={styles.passwordRequirements}>✕ 1 numeric character</Text>
        )}

        {hasSpecialCharacters(password) ? (
          <Text style={styles.passwordRequirements}>✓ 1 special character</Text>
        ) : (
          <Text style={styles.passwordRequirements}>✕ 1 special character</Text>
        )}
      </View>

      {email !== "" && password !== "" && isPasswordSufficient(password) && (
        <TouchableOpacity
          style={styles.buttonReady}
          onPress={() => {
            if (userType === COACH) {
              registerUser();
            } else {
              props.navigation.navigate(ScreenNames.COACH_INFO_REGISTRATION);

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

  textBox: {
    color: "#555555",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
    backgroundColor: "#FFFFFF",
  },

  checkContainer: {
    alignItems: "flex-start",
    //backgroundColor: "yellow",
    width: 220,
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
    marginTop: 170,
    fontWeight: "bold",
  },

  passwordInput: {
    width: 237,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    marginTop: 30,
    fontWeight: "bold",
  },

  buttonReady: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 330,
    width: 237,
    backgroundColor: "#000000",
  },

  passwordRequirements: {
    //fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
    fontSize: 13,
  },

  backContainer: {
    position: "absolute",
    left: 42,
    top: 40,
  },

  back: {
    fontSize: 30,
    fontWeight: "bold",
  },

  emailvalid: {
    textAlign: "left",
    marginTop: 5,
    fontSize: 13,
    justifyContent: "flex-start",
  },
  passwordRequirements1: {
    fontWeight: "normal",
    textAlign: "right",
    marginTop: 10,
  },

  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});

export default EmailPassScreen;
