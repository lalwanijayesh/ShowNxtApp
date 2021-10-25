import React, { useState } from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet} from 'react-native';
import ScreenNames from '../ScreenNames';

// special character array 
const symbols = '"~`!@#$%^&*()-_=+[{]}|;:,<>.?/"';
const symbolsArray = [];
for (let i = 0; i < symbols.length; i++) {
  symbolsArray.push(symbols.charAt(i));
}

// numbers array
const numArray = ['1','2','3','4','5','6','7','8','9'];

const UsernamePassword = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Check if the input username is valid
   * @returns {boolean} true if the length > 0
   */
  const isValidUsername = () => {
    return username.length > 0;
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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer}>
        <Text style={styles.back}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.register}>{"REGISTER"}</Text>
      <Text>{username.length > 0}</Text>

      <TextInput placeholder="Choose Username" 
                  autoCapitalize="none"
                  autoCorrect={false}
                  value = {username}
                  onChangeText={setUsername}
                  style={[styles.box, styles.textBox, styles.spacingBetweenHeader]} />

      <View style={styles.checkContainer}>
        <Text>{"x username must not include..."}</Text>
      </View>
      

      <TextInput placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  style={[styles.box, styles.textBox, styles.spacingBetweenBoxes]} />
                  
      <View style={styles.checkContainer}>
        <Text>{"password must include following:"}</Text>
        <Text>{"x at least 8 characters"}</Text>
        <Text>{"x numeric characters"}</Text>
        <Text>{"x special characters"}</Text>
      </View>

      {isValidUsername() && isValidPassword() &&
        <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.ATHLETE_SPORT_INFO)} 
                          style={styles.nextContainer}>
          <Text>{"Next >"}</Text>
        </TouchableOpacity>}
    </View>
  );
}

export default UsernamePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  nextContainer: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 6,
    height: 37,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  }

})