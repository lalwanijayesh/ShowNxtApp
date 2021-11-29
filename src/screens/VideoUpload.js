import React, {useState, useEffect} from 'react';
import {Button, Text, View, Platform, StyleSheet} from 'react-native';
import {Video} from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../firebase/firebase';
import sampleVideo from '../../assets/video/sample.mp4'

export default function ImagePickerExample() {
    const videoRef = React.useRef(null);
    const [video, setVideo] = useState(null);
    const [status, setStatus] = React.useState({});

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
            setStatus({isPlaying: false})
            videoRef.current.pauseAsync()
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
            console.log('Uploaded video successfully!');
            blob.close();
        });
    }

    return (
        <View style={styles.container}>
            {video &&
            <Video
                ref={videoRef}
                style={styles.video}
                source={{uri: video}}
                // source={sampleVideo}
                useNativeControls
                resizeMode="contain"
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            }
            <View style={styles.buttons}>
                <Button title="Pick a Video"
                        onPress={pickVideo}/>
                <Button
                    title={status.isPlaying ? 'Pause' : 'Play'}
                    onPress={() =>
                        status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()
                    }
                />
                <Button title="Upload" onPress={uploadVideo}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    video: {
        alignSelf: 'center',
        width: 640,
        height: 400,
    },
    buttons: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
