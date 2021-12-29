import React, { useState, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import firebase from "../../firebase/firebase";
import ScreenNames from "../../constants/ScreenNames";
import { gql, useMutation } from '@apollo/client';
import {ATHLETE} from "../../constants/enums";
import Icon from "react-native-ico-material-design";

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $type: UserType!) {
    createUser(email: $email, type: $type) {
      id
    }
  }
`;


// special character array
const symbols = '"~`!@#$%^&*()-_=+[{]}|;:,<>.?/"';
const symbolsArray = [];
for (let i = 0; i < symbols.length; i++) {
  symbolsArray.push(symbols.charAt(i));
}

// numbers array
const numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const AthleteEmailPassword = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUser] = useMutation(CREATE_USER, {
    onError: error => {
      console.log(error);
      Alert.alert("An error occurred during login. Please contact administrator.");
    }
  });

  /**
   * Check if the input email is valid
   * @returns {boolean} true if the length > 0
   */
  const isValidEmail = () => {
    return email.length > 0;
  };

  /**
   * check if password includes one characters in the given array
   * @param {Array} array the given array
   * @returns {boolean} true if the password has at least one character.
   */
  const isIncluded = (array) => {
    for (let pass = 0; pass < password.length; pass++) {
      let character = password.charAt(pass);
      if (array.includes(character)) {
        return true;
      }
    }
    return false;
  };

  /**
   * Check if the input password is valid
   * @returns {boolean} true if it is valid
   */
  const isValidPassword = () => {
    return (
      password.length >= 8 && isIncluded(symbolsArray) && isIncluded(numArray)
    );
  };

  const registerUser = () => {
    if (!isValidEmail && !isValidPassword) {
      Alert.alert("Please enter valid email and password.");
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        createUser({variables: {email: email, type: ATHLETE.toUpperCase()}}).then(res => {
          console.log("User created successfully with id " + res.data.createUser.id);
          userCredential.user.sendEmailVerification()
              .then(() => {
                navigation.navigate(ScreenNames.EMAIL_CONFIRMATION, {
                  ...route.params,
                  email: email,
                  userId: res.data.createUser.id
                });
              })
              .catch((error) => Alert.alert("An error occurred while sending verification email!"))
        })
      }).catch(error => Alert.alert(error.message));
    }
  };

  const renderRegisterScreen = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
            style={styles.backContainer}
            onPress={() => navigation.navigate(ScreenNames.ATHLETE_COACH_SELECTION)}
        >
          <Icon
              name="left-arrow-key"
              height={15}
              width={15}
              color="black"
          />
        </TouchableOpacity>

        <Text style={styles.register}>{"REGISTER"}</Text>

        <TextInput
          placeholder="Enter email"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          style={[styles.box, styles.textBox, styles.spacingBetweenHeader]}
        />

        <View style={styles.margin1}>
          <View style={styles.checkContainer}>
            <Text>{"Please use a valid email."}</Text>
          </View>
        </View>

        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={[styles.box, styles.textBox, styles.spacingBetweenBoxes]}
        />

        <View style={styles.margin1}>
          <View style={styles.checkContainer}>
            <Text>{"Password must include the following:"}</Text>
            <View style={styles.margin2}>
              <Text style={styles.passwordRequirements}>
                {password.length >= 8
                  ? "✓  at least 8 characters"
                  : "x  at least 8 characters"}
              </Text>
              <Text style={styles.passwordRequirements}>
                {isIncluded(numArray)
                  ? "✓  1 numeric character"
                  : "x  1 numeric character"}
              </Text>
              <Text style={styles.passwordRequirements}>
                {isIncluded(symbolsArray)
                  ? "✓  1 special character"
                  : "x  1 special character"}
              </Text>
            </View>
          </View>
        </View>

        {isValidEmail() && isValidPassword() && (
          <TouchableOpacity
            onPress={registerUser}
            style={[styles.box, styles.nextBtn, { flexDirection: "row" }]}
          >
            <Text style={styles.nextText}>{"Next"}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return renderRegisterScreen();
};

export default AthleteEmailPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  margin1: {
    marginTop: 10,
  },
  margin2: {
    marginTop: 4,
  },
  textBox: {
    color: "#555555",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
    marginHorizontal: 69,
    paddingLeft: 17,
    backgroundColor: "#FFFFFF",
  },
  box: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 6,
    height: 37,
  },
  spacingBetweenHeader: {
    marginTop: 100,
  },
  spacingBetweenBoxes: {
    marginTop: 46,
  },
  checkContainer: {
    marginHorizontal: 77,
  },
  nextBtn: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 69,
    marginTop: 200,
    backgroundColor: "#000000",
    height: 40,
  },
  nextText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
  },
});
