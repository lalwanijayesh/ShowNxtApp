import React, { useState, useEffect } from 'react';
import { Text, View, Platform, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../firebase/firebase';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const ImagePickerExample = () => {
  const videoRef = React.useRef(null);
  const [video, setVideo] = useState(null);
  const [status, setStatus] = React.useState({});

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setVideo(result.uri);
      setStatus({ isPlaying: false });
      //videoRef.current.pauseAsync();
      uploadVideo();
    }
  };

  const uploadVideo = async () => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child('videos/upload1.mp4');
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", video, true);
      xhr.send(null);
    });

    fileRef.put(blob).then((snapshot) => {
      Alert.alert('Uploaded video successfully!');
      blob.close();
    });
  }

  return (
    <View>
      {video &&
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: video }}
          useNativeControls={false}
          resizeMode="cover"
          isLooping
          shouldPlay
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      }
      {!video && <View style={styles.buttons}>
        <TouchableOpacity onPress={pickVideo}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{"+"}</Text>
        </TouchableOpacity>
        {/* <Button
                    title={status.isPlaying ? 'Pause' : 'Play'}
                    onPress={() =>
                        status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()
                    }
                /> */}
        {/* <Button title="Upload" onPress={uploadVideo}/> */}
      </View>}
    </View>
  );
}

export default ImagePickerExample;

const styles = StyleSheet.create({
  video: {
    width: 135,
    height: 271,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

