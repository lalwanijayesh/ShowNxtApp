import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  ActivityIndicator
} from "react-native";
import ScreenNames from "../../constants/ScreenNames";
import UserIdContext from "../../AppContext";
import {gql, useMutation} from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import firebase from "../../firebase/firebase";
import uuid from "react-native-uuid";
import {Video} from "expo-av";
import Icon from "react-native-ico-material-design";

const ADD_VIDEO = gql`
mutation AddProfileVideo($profileId: ID!, $filePath: String!) {
  addProfileVideo(profileId: $profileId, filePath: $filePath) {
    videoId
    uploadDate
  }
}
`

const AthleteComplete = ({ navigation, route }) => {
  // TODO use application context to store details of logged-in user
  const [userId, setUserId] = useContext(UserIdContext);

  const [addVideo] = useMutation(ADD_VIDEO, {
    onError: (error) => console.log(error),
  });
  const [loading, setLoading] = useState(false);

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

  const dummy = {id: 0, source: null};

  const [videos, setVideos] = useState([]);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.uri);
      await uploadVideo(result.uri);
    }
  };

  const uploadVideo = async (uri) => {
    setLoading(true);
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
          profileId: route.params.profileId,
          filePath: filePath,
        },
      }).then(res => {
        console.log("File Path saved - " + filePath);
        setVideos(videos => [...videos, {
          id: res.data.addProfileVideo.videoId,
          source: uri
        }]);
        setLoading(false);
      });
    });
  }

  const renderItem = ({item}) => {
    return (
        <View style={{ marginRight: 17 }}>
          <View style={styles.videoStyle}>
            {item.id === 0 ? (
            <View style={styles.buttons}>
              <TouchableOpacity onPress={pickVideo}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{"+"}</Text>
              </TouchableOpacity>
            </View>
            ) : (
            <Video
                style={styles.video}
                source={{ uri: item.source }}
                useNativeControls={false}
                resizeMode="cover"
                isLooping
                isMuted
                shouldPlay
            />
            )}
          </View>
        </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation.navigate(ScreenNames.ATHLETE_ACADEMIC,
              route.params)}>
        <Icon
            name="left-arrow-key"
            height={15}
            width={15}
            color="black"
        />
      </TouchableOpacity>

      <Text style={styles.register}>{"COMPLETE PROFILE"}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.avatar}>
          {/* TODO add profile avatar here */}
        </View>
        <View>
          <Text style={styles.textName}>{route.params.fullName}</Text>
          <Text style={[styles.spacingBetweenText, styles.textInfo]}>
            {route.params.positionName}
          </Text>
          <Text style={styles.textInfo}>{route.params.schoolName}</Text>
        </View>
      </View>
      <Text style={styles.videoTitle}>{"Videos"}</Text>

      <View style={{ marginHorizontal: 34, marginTop: 23 }}>
        <FlatList
          bounces={false}
          data={videos.concat(dummy)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>

      <Text style={styles.text}>
        {"Place the most explosive video first in line for the best result."}
      </Text>

      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => {
          setUserId(route.params.userId);
          navigation.navigate(ScreenNames.ATHLETE_TAB_FLOW, route.params);
        }}
      >
        <Text style={styles.nextText}>{"Start Exploring"}</Text>
      </TouchableOpacity>
      {loading &&
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000FF" />
        <Text>Uploading ...</Text>
      </View>
      }
    </View>
  );
};

export default AthleteComplete;

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
  infoContainer: {
    marginTop: 40,
    flexDirection: "row",
    marginHorizontal: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 34,
  },
  textName: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
    color: "#000000",
    marginTop: 10
  },
  spacingBetweenText: {
    marginTop: 30,
  },
  textInfo: {
    color: "#555555",
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },
  videoTitle: {
    marginTop: 50,
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
    color: "#000000",
    marginLeft: 34,
  },
  videoStyle: {
    width: 135,
    height: 271,
    backgroundColor: "#EEEEEE",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 22,
    marginLeft: 34,
    fontSize: 8,
    lineHeight: 11,
    color: "#000000",
  },
  nextBtn: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 69,
    marginTop: 71,
    backgroundColor: "#000000",
    height: 40,
    borderRadius: 6,
  },
  nextText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
  },
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
  loading: {
    position: 'absolute',
    backgroundColor: '#F5FCFF88',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
