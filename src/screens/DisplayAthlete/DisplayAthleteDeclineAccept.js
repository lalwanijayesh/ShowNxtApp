import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-ico-material-design";
import { Video } from "expo-av";
import firebase from "../../firebase/firebase";
import { firebaseBucket } from "../../constants/config";

// TODO replace dummy links with applicant athlete videos from backend
export const videos = [
  { id: 1, path: "videos/sample.mp4" },
  { id: 2, path: "videos/dogvid.mp4" },
  { id: 3, path: "videos/tree.mp4" },
];

// TODO: make a method that for each video displays a little white circle at the bottom of the screen
const { width, height } = Dimensions.get("window");

const DisplayAthlete = ({ navigation }) => {
  constructor;

  const [currentlyPlaying, setCurrentlyPlaying] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [visibleButton1, setVisibleButton1] = React.useState(true);
  const [videoUrls, setVideoUrls] = React.useState([]);

  const changeVisibility = () => {
    setVisible(true);
    setVisibleButton1(false);
  };

  const changeVisibilitySwitch = () => {
    setVisible(false);
    setVisibleButton1(true);
  };

  const handleVideoClick = (index) => {
    if (currentlyPlaying === index) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(index);
    }
  };

  React.useEffect(() => {
    const storage = firebase.storage();
    Promise.all(
      videos.map(async (video) => {
        const url = await storage
          .refFromURL("gs://" + firebaseBucket + "/" + video.path)
          .getDownloadURL();
        console.log(url);
        return url;
      })
    ).then((data) => {
      setVideoUrls(data);
    });
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        style={styles.containerVid}
        onPress={() => handleVideoClick(index)}
      >
        <Video
          style={styles.video}
          source={{
            uri: item,
          }}
          useNativeControls={false}
          isLooping
          shouldPlay={index === currentlyPlaying}
          resizeMode="contain"
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* DISPLAYING THE VIDEO  */}
      <View style={styles.containerVid}>
        <SafeAreaView>
          <FlatList
            horizontal
            pagingEnabled
            bounces={false}
            disableIntervalMomentum={true}
            snapToInterval={width * 1.25}
            data={videoUrls}
            renderItem={renderItem}
            onScrollEndDrag={() => setCurrentlyPlaying(null)}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      </View>

      {/* BUTTONS TO REJECT AND ACCEPT + DOTS FOR EACH VID */}
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsBar}>
          <TouchableOpacity style={styles.circleDecline}>
            <Text style={styles.symbolText}>X</Text>
          </TouchableOpacity>
          <View style={styles.circlePerVid}></View>
          <TouchableOpacity style={styles.circleAccept}>
            <Text style={styles.symbolText}>✓</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* BUTTONS TO REJECT AND ACCEPT + DOTS FOR EACH VID */}

      {/* NAME/AGE OF ATHLETE */}
      <View style={styles.nameAgeBar}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ScreenNames.DISPLAY_ATHLETE_PROFILE)
          }
        >
          <Text style={styles.textName}> Jake Smith, 19</Text>
        </TouchableOpacity>
      </View>
      {/* NAME/AGE OF ATHLETE */}

      {/* POSITION OF ATHLETE */}
      <View style={styles.positionBar}>
        <Text style={styles.textLocation}> 🏐 Goalkeeper</Text>
      </View>
      {/* POSITION OF ATHLETE */}

      {/* LOCATION OF ATHLETE */}
      <View style={styles.locationBar}>
        <Text style={styles.textLocation}> 📍 Boston, MA</Text>
      </View>
      {/* LOCATION OF ATHLETE */}
      {/* TOP DROPDOWN BUTTON */}
      <TouchableOpacity
        style={visibleButton1 ? styles.dropdownButton : styles.hidden}
        onPress={() => changeVisibility()}
      >
        <Text style={styles.symbolText}>V</Text>
      </TouchableOpacity>
      {/* TOP DROPDOWN BUTTON */}
      {/* ATHLETE INFO */}
      <View style={visible ? styles.atheleteInfoBar : styles.hidden}>
        <Text style={styles.textLocation}> </Text>
        <Text style={styles.textLocation}> </Text>
        <Text style={styles.textInfoAthlete}> Height: 6'2"</Text>
        <Text style={styles.textInfoAthlete}> Weight: 170lbs</Text>
        <Text style={styles.textInfoAthlete}> GPA: 3.5</Text>
        <Text style={styles.textInfoAthlete}> SAT: 1500</Text>
        <TouchableOpacity onPress={() => changeVisibilitySwitch()}>
          <Text style={styles.symbolText}>^</Text>
        </TouchableOpacity>
      </View>
      {/* ATHLETE INFO */}
      <View style={styles.buttonChangeVidContainer}>
        <TouchableOpacity
          style={styles.buttonChangeVidRect1}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonChangeVidRect2}
        ></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerVid: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: width * 1.25,
    height: height * 1.8,
    //width: 640 * 2.3,
    // height: 400 * 2.3,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },

  buttonChangeVidContainer: {
    flexDirection: "row",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonChangeVidRect1: {
    height: "100%",
    width: "50%",
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    color: "red",
  },
  buttonChangeVidRect2: {
    height: "100%",
    width: "50%",
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    color: "blue",
  },
  buttonsBar: {
    flexDirection: "row",
    width: "105%",
    // backgroundColor: `#000000`,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonsContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 85,
    color: `#000000`,
  },

  locationBar: {
    flexDirection: "row",
    width: "90%",
    //backgroundColor: `pink`,
    //alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 190,
    alignItems: "flex-start",
  },
  positionBar: {
    flexDirection: "row",
    width: "90%",
    //backgroundColor: `pink`,
    //alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 220,
    alignItems: "flex-start",
  },

  nameAgeBar: {
    flexDirection: "row",
    width: "90%",
    //backgroundColor: `pink`,
    //alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 253,
    alignItems: "flex-start",
  },
  dropdownButton: {
    flexDirection: "row",
    width: "90%",
    //backgroundColor: `pink`,
    //alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 60,
    alignItems: "center",
  },

  icon: {
    padding: 14,
  },
  circleDecline: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: "red",
    margin: 5,
    display: "flex",
    alignItems: "center",
  },
  circleAccept: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: "mediumseagreen",
    margin: 5,
    display: "flex",
    alignItems: "center",
  },
  circlePerVid: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: "white",
    margin: 5,
    display: "flex",
    alignItems: "center",
  },
  symbolText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 40,
    textAlign: "center",
    margin: 15,
  },
  textLocation: {
    // fontWeight: "bold",
    color: "white",
    fontSize: 25,
  },

  textInfoAthlete: {
    //fontWeight: "bold",
    color: "white",
    fontSize: 26,
  },

  textName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 35,
  },

  atheleteInfoBar: {
    position: "absolute",
    alignItems: "center",
    top: 0,
    color: `#000000`,
    height: 280,
    flexDirection: "column",
    width: "100%",
    backgroundColor: "black",
    justifyContent: "space-evenly",
    opacity: 0.8,
    borderRadius: 10,
  },

  containerForGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 500,
    bottom: 0,
  },

  hidden: {
    display: "none",
  },
});

export default DisplayAthlete;
