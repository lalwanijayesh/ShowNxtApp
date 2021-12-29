import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Video } from "expo-av";
import firebase from "../../firebase/firebase";
import { FIREBASE_BUCKET } from "@env";
import {gql, useLazyQuery, useMutation} from "@apollo/client";
import ScreenNames from "../../constants/ScreenNames";
import Icon from "react-native-ico";

const GET_NEXT_APPLICATION = gql`
query Query($userId: ID!) {
  coach(userId: $userId) {
    nextApplication {
      applicationId
      profile {
        profileId
        athlete {
          lastName
          userId
          firstName
          gender
          gpa
          sat
          act
          height
          weight
        }
        positionId
        videos {
          videoId
          filePath
          uploadDate
        }
      }
      schoolId
    }
  }
}
`
const SET_EVALUATION_STATUS = gql`
mutation Mutation($applicationId: ID!, $coachId: ID!, $status: EvalStatus!) {
  makeEvaluation(applicationId: $applicationId, coachId: $coachId, status: $status) {
    status
  }
}
`
const GET_POSITIONS = gql`
query Query {
  positions {
    positionId
    positionName
  }
}
`

const { width, height } = Dimensions.get("window");

const CoachEvaluation = ({ navigation, route }) => {

  const [currentlyPlaying, setCurrentlyPlaying] = React.useState(null);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const [videoUrls, setVideoUrls] = React.useState([]);

  const [applicationId, setApplicationId] = React.useState(null);
  const [athleteProfile, setAthleteProfile] = React.useState(null);

  const [positions, setPositions] = React.useState([]);
  const [getPositions] = useLazyQuery(GET_POSITIONS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log(data.positions);
      setPositions(data.positions);
    }
  });

  const [getNextApplication] = useLazyQuery(GET_NEXT_APPLICATION, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log(data);
      const storage = firebase.storage();
      if (data.coach.nextApplication !== null) {
        setApplicationId(data.coach.nextApplication.applicationId);
        const positionName = positions.filter(p =>
            p.positionId === data.coach.nextApplication.profile.positionId)[0].positionName;
        setAthleteProfile({...data.coach.nextApplication.profile.athlete, positionName});
        Promise.all(
            data.coach.nextApplication.profile.videos.map(async (video) => {
              const url = await storage
                  .refFromURL("gs://" + FIREBASE_BUCKET + "/" + video.filePath)
                  .getDownloadURL();
              console.log(url);
              return url;
            })
        ).then((data) => {
          setVideoUrls(data);
        });
      } else {
        setApplicationId(null);
        setAthleteProfile(null);
        setVideoUrls([]);
      }
    }
  });

  const [setEvaluationStatus] = useMutation(SET_EVALUATION_STATUS, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      if (data.makeEvaluation.status === 'ACCEPT') {
        Alert.alert("ACCEPTED");
      } else if (data.makeEvaluation.status === 'DISMISS') {
        Alert.alert("DISMISSED");
      }
      nextApplication();
    }
  });

  const handleVideoClick = (index) => {
    if (currentlyPlaying === index) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(index);
    }
  };

  const nextApplication = () => {
    console.log(route.params.userId);
    getNextApplication({
      variables: {
        userId: route.params.userId
      }
    });
  };

  React.useEffect(() => {
    getPositions();
    nextApplication();
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

  const evaluateApplication = (status) => {
    setEvaluationStatus({
      variables: {
        applicationId: applicationId,
        coachId: route.params.userId,
        status: status
      }
    });
  };

  return (
    (athleteProfile !== null && videoUrls.length > 0 && positions.length > 0) ?
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
          <TouchableOpacity style={styles.circleDecline}
                            onPress={() => evaluateApplication('DISMISS')}>
            <Text style={styles.symbolText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleAccept}
                            onPress={() =>  evaluateApplication('ACCEPT')}>
            <Text style={styles.symbolText}>✓</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* NAME/AGE OF ATHLETE */}
      <View style={styles.nameAgeBar}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ScreenNames.DISPLAY_ATHLETE_PROFILE)
          }
        >
          <Text style={styles.textName}>
            {athleteProfile.firstName + " " + athleteProfile.lastName}
          </Text>
        </TouchableOpacity>
      </View>

      {/* POSITION AND LOCATION OF ATHLETE */}
      <View style={styles.positionBar}>
        <Text style={styles.textLocation}> {"🏐 "}
          {athleteProfile.positionName}
        </Text>
      </View>
      <View style={styles.locationBar}>
        <Text style={styles.textLocation}> 📍 Boston, MA</Text>
      </View>

      {/* ATHLETE INFO DROPDOWN BUTTON */}
      <TouchableOpacity
        style={dropdownVisible ? styles.hidden : styles.dropdownButton}
        onPress={() => setDropdownVisible(true)}
      >
        <Icon
            name="angle-arrow-pointing-down"
            group="coolicons"
            height={40}
            width={40}
            color="white"
        />
      </TouchableOpacity>

      {/* ATHLETE INFO */}
      <View style={dropdownVisible ? styles.athleteInfoBar : styles.hidden}>
        <Text style={styles.textInfoAthlete}> Height 6'2"</Text>
        <Text style={styles.textInfoAthlete}> Weight 170 lbs</Text>
        <Text style={styles.textInfoAthlete}> GPA 3.5</Text>
        <Text style={styles.textInfoAthlete}> SAT 1500</Text>
        <TouchableOpacity onPress={() => setDropdownVisible(false)}>
          <Icon
              name="up-arrow-angle"
              group="coolicons"
              height={40}
              width={40}
              color="white"
          />
        </TouchableOpacity>
      </View>

    </View>
    :
    <View style={styles.container}>
      <Text>No New Applications</Text>
    </View>
  )
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
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  buttonsBar: {
    flexDirection: "row",
    width: "105%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonsContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 65,
    color: `#000000`,
  },
  locationBar: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 190,
    alignItems: "flex-start",
  },
  positionBar: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 220,
    alignItems: "flex-start",
  },
  nameAgeBar: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 253,
    alignItems: "flex-start",
  },
  dropdownButton: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
    position: "absolute",
    top: 70,
    alignItems: "center",
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
  symbolText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 40,
    textAlign: "center",
    margin: 15,
  },
  textLocation: {
    color: "white",
    fontSize: 25,
  },
  textInfoAthlete: {
    color: "white",
    fontSize: 24
  },
  textName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 35,
  },
  athleteInfoBar: {
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
    padding: 20
  },
  hidden: {
    display: "none",
  },
});

export default CoachEvaluation;
