import React  from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback, ActivityIndicator
} from "react-native";
import college from "../../../assets/college.jpg";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {LinearGradient} from "expo-linear-gradient";

const GET_SCHOOL_POSITIONS = gql`
  query GetSchoolAndPositions($schoolId: ID!) {
    school(schoolId: $schoolId) {
      schoolId
      name
      location
      openings {
        coachId
        openingCount
        position {
          positionId
          positionName
        }
      }
    }

    positions {
      positionId
      positionName
      sportId
    }

    sports {
      sportId
      sportName
    }
  }
`;

const GET_PROFILES_FOR_ATHLETE = gql`
  query AthleteProfiles($userId: ID!) {
    athleteProfiles(user_id: $userId) {
      profileId
      positionId
    }
  }
`;

const CREATE_APPLICATION = gql`
  mutation CreateApplication(
    $profileId: ID!
    $schoolId: ID!
    $positionId: ID!
  ) {
    createApplication(
      profileId: $profileId
      schoolId: $schoolId
      positionId: $positionId
    ) {
      applicationId
    }
  }
`;

const height = Dimensions.get('screen').height;

const SchoolInfo = (props) => {
  const { userId, schoolId, name, location } = props.route.params;
  // const [userId, setUserId] = React.useContext(UserIdContext);

  const [openings, setOpenings] = React.useState([]);
  const [shouldSkip, setShouldSkip] = React.useState(false);

  const [selectedOpening, setSelectedOpening] = React.useState(null);

  const [createApplication] = useMutation(CREATE_APPLICATION, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      Alert.alert("Application sent!");
    },
  });

  const handleClick = () => {
    if (selectedOpening) {
      setSelectedOpening(null);
    }
  };

  const [attemptToApply] = useLazyQuery(GET_PROFILES_FOR_ATHLETE, {
    variables: { userId },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log(data);
      console.log(selectedOpening);
      let profile = data.athleteProfiles.find(
        (potentialProfile) =>
          potentialProfile.positionId === selectedOpening.positionId
      );
      console.log(profile);
      if (profile) {
        // We can successfully apply with relevant profile meeting requirements
        createApplication({
          variables: {
            profileId: profile.profileId,
            schoolId: schoolId,
            positionId: selectedOpening.positionId,
          },
        }).then(r => console.log("Application Sent!"));
      } else {
        Alert.alert("You haven't created a profile for that position yet!");
      }
      setSelectedOpening(null);
    },
  });

  const { loading, error, data } = useQuery(GET_SCHOOL_POSITIONS, {
    variables: { schoolId },
    skip: shouldSkip,
    onCompleted: (data) => {
      let resOpenings = [];
      for (let i = 0; i < data.school.openings.length; i += 1) {
        let opening = data.school.openings[i];

        let position = data.positions.find(
          (possiblePosition) =>
            possiblePosition.positionId === opening.position.positionId
        );

        let sport = data.sports.find(
          (possibleSport) => possibleSport.sportId === position.sportId
        );

        resOpenings.push({
          positionId: opening.position.positionId,
          coachId: opening.coachId,
          openingCount: opening.openingCount,
          positionName: position.positionName,
          sportId: position.sportId,
          sportName: sport.sportName,
        });
      }
      setOpenings(resOpenings);
      setShouldSkip(true);
    },
  });

  if (loading)
    return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000FF" />
          <Text>Loading ...</Text>
        </View>
    );
  if (error) return <Text>Error</Text>;

  return (
    <TouchableWithoutFeedback onPress={() => handleClick()}>
    <View style={styles.container}>
        <Image style={styles.photoContainer} source={college} />
        <Text style={styles.collegeNameText}>{name}</Text>
        <Text style={styles.locationText}>📍 {location}</Text>
        <View style={styles.containerDescription}>
          <Text style={{textAlign: 'justify'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae gravida ante, vitae sodales arcu.
            Proin dictum lacinia risus nec hendrerit. Mauris tincidunt, ipsum porta aliquam vehicula, tortor sapien
            posuere est, sed suscipit dolor eros vel elit. Nullam cursus ex.
          </Text>
        </View>
      {openings.length !== 0
          ? <Text style={styles.titleText}>POSITIONS OPEN FOR 2021 APPLICATION</Text>
          : <Text style={styles.titleText}>NO POSITIONS OPEN FOR 2021 APPLICATION</Text>
      }
      {openings && <ScrollView style={styles.positionsScroll}>
        {openings.map(
          ({ positionId, coachId, positionCount, positionName, sportName }, index) => (
            <View key={index} style={styles.containerPosition}>
              <Text style={styles.positionsText}>{sportName}</Text>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() =>
                  setSelectedOpening({
                    positionId,
                    coachId,
                    positionCount,
                    positionName,
                    sportName,
                  })
                }
              >
                <Text style={styles.positionsText}>{positionName}</Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </ScrollView>}

      {selectedOpening && (
        <LinearGradient
            colors={['rgb(217, 238, 253)', 'rgb(255, 255, 255)']}
            style={styles.applyView}>
          <Text style={styles.positionText}>
            {selectedOpening.positionName}
          </Text>
          <Text style={styles.teamText}>{selectedOpening.sportName}</Text>
          <Text style={styles.oneReq}> ✓ Minimum 3.0 GPA</Text>
          <Text style={styles.twoReq}> ✓ 1100+ SATs</Text>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => {
              console.log("Applying with user id " + userId);
              attemptToApply();
            }}
          >
            <Text style={styles.applyText}>APPLY</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  positionsScroll: {
    width: "90%",
    margin: 20
  },
  oneReq: {
    marginTop: 50,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  twoReq: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  applyText: {
    color: "white",
    fontSize: 25,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    backgroundColor: '#FFFFFF'
  },
  nextButton: {
    borderColor: "black",
    borderRadius: 8,
    padding: 5,
    borderWidth: 1,
  },
  applyButton: {
    borderColor: "black",
    backgroundColor: "black",
    borderRadius: 8,
    padding: 5,
    borderWidth: 1,
    width: 250,
    alignItems: "center",
    marginTop: 60,
  },
  containerDescription: {
    height: "20%",
    width: "80%",
    marginTop: 25,
  },
  containerPosition: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "red",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5
  },
  photoContainer: {
    width: "100%",
    height: 250,
  },
  collegeNameText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
    margin: 22,
  },
  titleText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 14,
  },
  locationText: {
    color: "black",
    fontSize: 16,
    margin: -15,
  },
  positionsText: {
    color: "black",
    fontSize: 15,
  },
  positionText: {
    color: "black",
    fontSize: 25,
    marginTop: 45,
    fontWeight: "bold",
    textTransform: 'uppercase'
  },
  teamText: {
    color: "black",
    fontSize: 17,
    marginTop: 2,
  },
  applyView: {
    width: "100%",
    height: "50%",
    position: "absolute",
    top: height * 0.52,
    borderRadius: 39,
    flexDirection: "column",
    alignItems: "center",
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

export default SchoolInfo;
