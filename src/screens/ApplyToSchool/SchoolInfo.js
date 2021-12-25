import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
//import ScreenNames from "../constants/ScreenNames";
import Icon from "react-native-ico-material-design";
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
        positionId
        coachId
        openingCount
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
    profilesAthlete(user_id: $userId) {
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

const SchoolInfo = (props) => {
  const [visible, setVisible] = React.useState(false);

  const { schoolId, name, location } = props.route.params;
  const [userId, setUserId] = React.useContext(UserIdContext);

  const [openings, setOpenings] = React.useState([]);
  const [shouldSkip, setShouldSkip] = React.useState(false);

  const [selectedOpening, setSelectedOpening] = React.useState(null);

  const [createApplication] = useMutation(CREATE_APPLICATION, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      Alert.alert("Successfully applied to school!");
    },
  });

  const [attemptToApplyToSelected] = useLazyQuery(GET_PROFILES_FOR_ATHLETE, {
    variables: { userId },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",

    onCompleted: (data) => {
      let profile = data.profilesAthlete.find(
        (potentialProfile) =>
          potentialProfile.positionId === selectedOpening.positionId
      );

      if (profile) {
        // We can successfully apply
        createApplication({
          variables: {
            profileId: profile.profileId,
            schoolId: schoolId,
            positionId: selectedOpening.positionId,
          },
        });
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
            possiblePosition.positionId === opening.positionId
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
    <View style={styles.container}>
      <Image style={styles.photoContainer} source={college} />
      <Text style={styles.collegeNameText}>{name}</Text>
      <Text style={styles.locationText}>📍 {location}</Text>
      <View style={styles.containerDescription}>
        <Text>
          {" "}
          Northeastern University is a private research university with its main
          campus in Boston. Established in 1898, the university offers
          undergraduate and graduate programs on its main campus in Boston as
          well as satellite campuses in Charlotte, North Carolina; Seattle,
          Washington; San Jose, California, etc.
        </Text>
      </View>
      <Text style={styles.titleText}>POSITIONS OPEN FOR 2021 APPLICATION</Text>
      {/* POSITIONS  */}

      <ScrollView style={styles.positionsScroll}>
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
      </ScrollView>

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
              attemptToApplyToSelected();
            }}
          >
            <Text style={styles.applyText}>APPLY</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  positionsScroll: {
    width: "90%",
  },

  oneReq: {
    marginTop: 60,
    color: "black",
    fontSize: 23,
    fontWeight: "bold",
  },
  twoReq: {
    color: "black",
    fontSize: 23,
    fontWeight: "bold",
  },
  applyText: {
    color: "white",
    //fontWeight: "bold",
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
    // height: 40,
    padding: 5,
    borderWidth: 1,
    //backgroundColor: "yellow",
  },

  applyButton: {
    borderColor: "black",
    backgroundColor: "black",
    borderRadius: 8,
    padding: 5,
    borderWidth: 1,
    width: 280,
    padding: 10,
    alignItems: "center",
    marginTop: 100,
  },

  containerDescription: {
    height: "20%",
    width: "80%",
    marginTop: 20,
  },
  containerPosition: {
    // backgroundColor: "yellow",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "red",
    width: "100%",
    // margin: 75,
    //textAlign: "center",
    //alignSelf: "center",
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
    fontSize: 17,
    // margin: -40,
  },
  locationText: {
    color: "black",
    fontSize: 20,
    margin: -15,
  },
  positionsText: {
    color: "black",
    fontSize: 18,
  },

  positionText: {
    color: "black",
    fontSize: 25,
    marginTop: 45,
    fontWeight: "bold",
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
    bottom: 17,
    opacity: 0.95,
    backgroundColor: "#87cefa",
    borderRadius: 39,
    flexDirection: "column",
    alignItems: "center",
  },
  //   descriptionText: {
  //     color: "black",
  //     fontSize: 16,
  //     margin: 55,
  //   },
});

export default SchoolInfo;
