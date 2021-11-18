import React, { useState, useRef } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  TextInput, 
  View, 
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import firebase from '../../firebase/firebase';
import ScreenNames from '../../constants/ScreenNames';

// special character array 
const symbols = '"~`!@#$%^&*()-_=+[{]}|;:,<>.?/"';
const symbolsArray = [];
for (let i = 0; i < symbols.length; i++) {
  symbolsArray.push(symbols.charAt(i));
}

// numbers array
const numArray = ['0','1','2','3','4','5','6','7','8','9'];

const AthleteEmailPassword = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useRef(false);

  /**
   * Check if the input email is valid
   * @returns {boolean} true if the length > 0
   */
  const isValidEmail = () => {
    return email.length > 0;
  }

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
  }

  /**
   * Check if the input password is valid
   * @returns {boolean} true if it is valid
   */
  const isValidPassword = () => {
    return password.length >= 8 && isIncluded(symbolsArray) && isIncluded(numArray);
  }

  const registerUser = () => {
    if (!isValidEmail && !isValidPassword) {
      Alert.alert("Please enter valid email and password.");
    } else {
      isLoading.current = true;
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        console.log("User registered successfully");
        isLoading.current = false;
        navigation.navigate(ScreenNames.EMAIL_CONFIRMATION);
      }).catch((error) => Alert.alert(error.message));
    }
  };
  
  // TODO: find the way to implement loading inddicator when it is navigating to the emailpass screen.
  const renderLoadingIndicator = () => {
    <View style={styles.preloader}>
      <ActivityIndicator size="large" color="#9E9E9E" />
    </View>
  };

  const renderRegisterScreen = () => {
    return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer} onPress={() => navigation.navigate('AthleteCoachSelection')}>
        <Text style={styles.back}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.register}>{"REGISTER"}</Text>

      <TextInput placeholder="Enter Email" 
                  autoCapitalize="none"
                  autoCorrect={false}
                  value = {email}
                  onChangeText={setEmail}
                  style={[styles.box, styles.textBox, styles.spacingBetweenHeader]} />

      <View style={styles.checkContainer}>
        <Text>{"Please use a valid email"}</Text>
      </View>
      
      <TextInput placeholder="Password"
                 autoCapitalize="none"
                 autoCorrect={false}
                 value={password}
                 onChangeText={setPassword}
                 secureTextEntry={true}
                 style={[styles.box, styles.textBox, styles.spacingBetweenBoxes]} />
                  
      <View style={styles.checkContainer}>
        <Text>{"Password must include following:"}</Text>
        <Text>{password.length >= 8 ? "✓ at least 8 characters" : "x at least 8 characters"}</Text>
        <Text>{isIncluded(numArray) ? "✓ 1 numeric characters" : "x 1 numeric characters"}</Text>
        <Text>{isIncluded(symbolsArray) ? "✓ 1 special characters" : "x 1 special characters"}</Text>
      </View>

      {isValidEmail() && isValidPassword() &&
        <TouchableOpacity onPress={registerUser} 
                          style={[styles.box, styles.nextBtn, {flexDirection: 'row'}]}>
          <Text style={styles.nextText}>{"Next"}</Text>
        </TouchableOpacity>}
    </View>
    )
  };
   
  return (
    renderRegisterScreen()
  );
}

export default AthleteEmailPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  backContainer: {
    position: 'absolute',
    left: 42,
    top: 40,
  },

  back: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  register: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16, 
    marginTop: 54,
    alignSelf: 'center',
  },

  textBox: {
    color: '#555555',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
    marginHorizontal: 69,
    paddingLeft: 17,
    backgroundColor: '#FFFFFF',
  },

  box: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 6,
    height: 37,
  },

  spacingBetweenHeader: {
    marginTop: 126,
  },

  spacingBetweenBoxes: {
    marginTop: 46,
  },

  checkContainer: {
    marginHorizontal: 72,
  },

  nextBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 69,
    marginTop: 312,
    backgroundColor: '#000000',
    height: 40,
  },

  nextText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
  },

  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
})