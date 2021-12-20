import React, { useState, useEffect } from 'react';
import { Text, View, Platform, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../firebase/firebase';
import uuid from 'react-native-uuid';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const ImagePickerExample = ({profileId, addVideo}) => {
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
      console.log(result.uri);
      await uploadVideo(result.uri);
    }
  };

  const uploadVideo = async (uri) => {
    const storageRef = firebase.storage().ref();
    const filePath = "videos/" + uuid.v4()
        + uri.substring(uri.lastIndexOf("."));
    const fileRef = storageRef.child(filePath);
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
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    fileRef.put(blob).then((snapshot) => {
      console.log('Uploaded video successfully!');
      blob.close();
      addVideo({
        variables: {
          profileId: profileId,
          filePath: filePath,
        },
      }).then(r => console.log("File Path saved - " + filePath));
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

