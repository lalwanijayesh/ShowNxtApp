import React, {useState} from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet, Alert, Keyboard } from 'react-native';
import ScreenNames from '../ScreenNames';

const AthleteHeightWeight = ({navigation}) => {

  const [ft, setFn] = useState(null);
  const [inch, setInch] = useState(null);
  const [weight, setWeight] = useState(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer}
                        onPress={() => navigation.navigate(ScreenNames.ATHLETE_SPORT_INFO)}>
        <Text style={styles.back}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.register}>{"REGISTER"}</Text>

      <View style={[styles.spacingBetweenHeader, styles.margin]}>
        <Text style={styles.text}>{"Height"}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput style={[styles.text, styles.spacingBetweenText, styles.textBox]}
                     keyboardType={"numeric"}
                     returnKeyLabel='Done' 
                     returnKeyType='done' 
                     onSubmitEditing={Keyboard.dismiss}
                     autoCapitalize="none"
                     autoCorrect={false}
                     value={ft}
                     onChangeText={setFn} />
          <Text style={[styles.text, styles.spacingBetweenText]}>{"ft"}</Text>
          <TextInput style={[styles.text, styles.spacingBetweenText, styles.textBox]}
                     keyboardType={"numeric"}
                     returnKeyLabel='Done' 
                     returnKeyType='done' 
                     onSubmitEditing={Keyboard.dismiss}
                     autoCapitalize="none"
                     autoCorrect={false}
                     value={inch}
                     onChangeText={setInch} />
          <Text style={styles.text}>{"in"}</Text>
        </View>
      </View>

      <View style={[styles.spacingBetweenBoxes, styles.margin]}>
        <Text style={styles.text}>{"Weight"}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput style={[styles.text, styles.spacingBetweenText, styles.textBox]}
                   keyboardType={"numeric"}
                   returnKeyLabel='Done' 
                   returnKeyType='done' 
                   onSubmitEditing={Keyboard.dismiss}
                   autoCapitalize="none"
                   autoCorrect={false}
                   value={weight}
                   onChangeText={setWeight} />
          <Text style={styles.text}>{"lbs"}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => {
                          ft && inch && weight ?
                          navigation.navigate(ScreenNames.ATHLETE_ACADEMIC) :
                          Alert.alert("Please enter your height and weight before moving to the next step!!")
                        }}
                        style={[styles.nextBtn, ft && inch && weight ? {backgroundColor: '#000000', borderColor: '#000000',} : {backgroundColor: '#888888', borderColor: '#888888',}]}>
        <Text style={styles.nextText}>{"Next"}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AthleteHeightWeight;

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

  text: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 6,
    paddingVertical: 5,
  },

  textBox: {
    borderColor: '#000000',
    borderWidth: 0.5,
  },

  margin: {
    marginHorizontal: 69,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  spacingBetweenText: {
    marginRight: 5,
  },

  spacingBetweenHeader: {
    marginTop: 126,
  },

  spacingBetweenBoxes: {
    marginTop: 46,
  },

  nextBtn: {
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 69,
    marginTop: 390,
    height: 40,
  },

  nextText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
  },
})