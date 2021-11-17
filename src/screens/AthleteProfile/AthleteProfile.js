import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import ScreenNames from '../ScreenNames';

// TODO: Replace image in the circle view
// TODO: find the way to let the user upload videos into react-native
// TODO: This screen is currently a pure UI, it will be fixed later to use to connect back-end for user data. 
const AthleteProfile = ({navigation}) => {

  const testData = [
    {
      id: '1',
      title: 'First Video',
    },
    {
      id: '2',
      title: 'Second Video',
    },
    {
      id: '3',
      title: 'Third Video',
    },
    {
      id: '4',
      title: 'Fourth Video',
    },
    {
      id: '5',
      title: 'Fifth Video',
    },
    {
      id: '6',
      title: 'Sixth Video',
    },
  ];


  const renderItem = (item) => (
    <View style={styles.videoStyle}
    >   
      <TouchableOpacity>
        <Text>{item.title}</Text>
      </TouchableOpacity>  
    </View> 
  );
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer}
                        onPress={() => navigation.navigate(ScreenNames.ATHLETE_ACADEMIC)}>
        <Text style={styles.back}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.register}>{"COMPLETE PROFILE"}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.avatar}></View>
        <View>
          <Text style={styles.textName}>{"Name LastName"}</Text>
          <Text style={[styles.spacingBetweenText, styles.textInfo]}>{"Position"}</Text>
          <Text style={styles.textInfo}>{"School in School Town, State"}</Text>
        </View>
      </View>

      <Text style={styles.videoTitle}>{"Videos"}</Text>

      <View style={{marginHorizontal: 34, marginTop: 23}}>
        <FlatList
          data={testData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={item => item.id}
        />
      </View>

      <Text style={styles.text}>{"Place the most explosive video first in line for the best result."}</Text>

      <TouchableOpacity style={styles.nextBtn}>
        <Text style={styles.nextText}>{"Start Exploring"}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AthleteProfile;

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

  infoContainer: {
    marginTop: 40,
    flexDirection: 'row',
    marginHorizontal: 32,
  },

  avatar: {
    width: 100,
    height: 100,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 34,
  },

  textName: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
    color: '#000000',
  },

  spacingBetweenText: {
    marginTop: 30,
  },

  textInfo: {
    color: '#555555',
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'bold',
  },

  videoTitle: {
    marginTop: 57,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 16,
    color: '#000000',
    marginLeft: 34,
  },

  videoStyle: {
    width: 125,
    height: 271,
    backgroundColor: '#EEEEEE',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginRight: 17,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    marginTop: 22,
    marginLeft: 34,
    fontSize: 8,
    lineHeight: 11,
    color: '#000000',
  },

  nextBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 69,
    marginTop: 71,
    backgroundColor: '#000000',
    height: 40,
    borderRadius: 6,
  },

  nextText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
  },
})