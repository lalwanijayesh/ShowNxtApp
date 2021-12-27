import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import college from "../../../assets/uni.jpg";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import UserIdContext from "../../AppContext";

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
        // We can successfully apply
        createApplication({
          variables: {
            profileId: profile.profileId,
            schoolId: schoolId,
            positionId: selectedOpening.positionId,
          },
        }).then(r => console.log("Application Sent!" + r.data));
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
          positionId: opening.positionId,
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

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error</Text>;

  return (
    <TouchableWithoutFeedback onPress={() => handleClick()}>
    <View style={styles.container}>
        <Image style={styles.photoContainer} source={college} />
        <Text style={styles.collegeNameText}>{name}</Text>
        <Text style={styles.locationText}>📍 {location}</Text>
        <View style={styles.containerDescription}>
          <Text style={{textAlign: 'justify'}}>
            Northeastern University is a private research university with its main
            campus in Boston. Established in 1898, the university offers
            undergraduate and graduate programs on its main campus in Boston as
            well as satellite campuses in Charlotte, North Carolina; Seattle,
            Washington; San Jose, California, etc.
          </Text>
        </View>
      {openings.length !== 0
          ? <Text style={styles.titleText}>POSITIONS OPEN FOR 2021 APPLICATION</Text>
          : <Text style={styles.titleText}>NO POSITIONS OPEN FOR 2021 APPLICATION</Text>
      }
      {openings && <ScrollView style={styles.positionsScroll}>
        {openings.map(
          ({ positionId, coachId, positionCount, positionName, sportName }) => (
            <View key={positionId} style={styles.containerPosition}>
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
        <View style={styles.applyView}>
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
        </View>
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
  containerPosition2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    margin: -60,
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
    top: height / 2,
    opacity: 0.95,
    backgroundColor: "#87cefa",
    borderRadius: 39,
    flexDirection: "column",
    alignItems: "center",
  },

});

export default SchoolInfo;
