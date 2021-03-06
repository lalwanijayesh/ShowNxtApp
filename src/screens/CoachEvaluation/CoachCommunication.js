import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import { gql, useLazyQuery } from "@apollo/client";

const GET_EVALUATIONS = gql`
query AcceptedEvaluations($userId: ID!) {
  coach(userId: $userId) {
    userId
    schoolId
    sportId
    acceptedEvaluations {
      application {
        applicationId
        profile {
          athlete {
            firstName
            lastName
          }
        }
      }
    }
    dismissedEvaluations {
      application {
        applicationId
        profile {
          athlete {
            firstName
            lastName
          }
        }
      }
    }
  }
}
`;

const AthleteItem = (props) => {
  const athlete = props.application.profile.athlete;

  const DEFAULT_FRAME_URI =
    "https://www.citypng.com/public/uploads/preview/-121610321166hb0qmpko3s.png";
  const DEFAULT_PROFILE_URI =
    "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/640px-SpongeBob_SquarePants_character.svg.png";

  return (
    <TouchableOpacity
      key={props.application.applicationId}
      onPress={() => {
        console.log("Selected " + props.application.profile.athlete.firstName);

        // TODO: navigate to communication page for that specific athlete
      }}
    >
      <View style={styles.athleteContainer}>
        <ImageBackground
          style={styles.athleteVideoFrame}
          source={{ uri: DEFAULT_FRAME_URI }}
        >
          <Image
            style={styles.athleteProfileImage}
            source={{ uri: DEFAULT_PROFILE_URI }}
          />

          <Text style={styles.athleteName}>
            {athlete.firstName} {athlete.lastName}
          </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const CoachCommunication = ({ navigation, route }) => {
  const [acceptedApplications, setAcceptedApplications] = React.useState([]);
  const [rejectedApplications, setRejectedApplications] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [likedSelected, setLikedSelected] = React.useState(true);

  const [getEvaluations] = useLazyQuery(GET_EVALUATIONS, {
    variables: { userId : route.params.userId },
    onCompleted: (data) => {
      setAcceptedApplications(data.coach.acceptedEvaluations.map(e => e.application));
      setRejectedApplications(data.coach.dismissedEvaluations.map(e => e.application));
    },
  });

  useEffect(() => {
    getEvaluations();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <View style={styles.searchFilterContainer}>
          <TextInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.searchInput}
            placeholder="Search"
          />

          <TouchableOpacity
            style={styles.filterContainer}
            onPress={() => console.log("Filter")}
          >
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterContainer}
            onPress={() => console.log("Sort")}
          >
            <Text style={styles.filterText}>Sort</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.likedRejectedContainer}>
          <TouchableOpacity
            style={
              likedSelected
                ? styles.likedButtonContainerSelected
                : styles.likedButtonContainerUnselected
            }
            onPress={() => setLikedSelected(true)}
          >
            <Text
              style={
                likedSelected
                  ? styles.likedButtonTextSelected
                  : styles.likedButtonTextUnselected
              }
            >
              Liked
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              likedSelected
                ? styles.likedButtonContainerUnselected
                : styles.likedButtonContainerSelected
            }
            onPress={() => setLikedSelected(false)}
          >
            <Text
              style={
                likedSelected
                  ? styles.likedButtonTextUnselected
                  : styles.likedButtonTextSelected
              }
            >
              Rejected
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.athletesScroll}
        contentContainerStyle={styles.athletesContainer}
      >
        {likedSelected
          ? (acceptedApplications.length !== 0 ?
              acceptedApplications
              .filter((application) =>
                (
                  application.profile.athlete.firstName +
                  " " +
                  application.profile.athlete.lastName
                )
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              )
              .map((application) => (
                <AthleteItem
                  application={application}
                  navigation={navigation}
                  key={application.applicationId}
                />
              )) :
              <Text style={styles.centerText}>
                No results to display
              </Text>
            )
          : (rejectedApplications.length !== 0 ?
              rejectedApplications
              .filter((application) =>
                (
                  application.profile.athlete.firstName +
                  " " +
                  application.profile.athlete.lastName
                )
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              )
              .map((application) => (
                <AthleteItem
                  application={application}
                  navigation={navigation}
                  key={application.applicationId}
                />
              )) :
              <Text style={styles.centerText}>
                No results to display
              </Text>
            )
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    marginTop: 50,
  },
  menuContainer: {
    display: "flex",
    flexDirection: "column",
  },
  searchFilterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchInput: {
    width: 200,
    backgroundColor: "#dddddd",
    height: 35,
    borderRadius: 20,
    color: "black",
    padding: 10,
  },
  filterContainer: {
    marginLeft: 20,
    backgroundColor: "rgba(164, 164, 164, 0.2)",
    borderRadius: 10,
    width: 52,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  filterText: {
    color: "black",
    fontWeight: "bold",
  },
  likedRejectedContainer: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    marginTop: 15,
  },
  likedButtonContainerUnselected: {
    backgroundColor: "#DBDDE0",
    width: "50%",
    borderRadius: 20,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  likedButtonContainerSelected: {
    backgroundColor: "#000000",
    width: "50%",
    borderRadius: 20,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  likedButtonTextSelected: {
    color: "#FFFFFF",
  },
  likedButtonTextUnselected: {
    color: "#000000",
  },
  athletesScroll: {
    width: "90%",
  },
  athletesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  athleteContainer: {
    borderColor: "black",
    borderRadius: 15,
    margin: 5,
  },
  athleteVideoFrame: {
    width: 170,
    height: 170,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    overflow: "hidden",
    borderRadius: 15,
  },
  athleteProfileImage: {
    width: 50,
    height: 50,
    overflow: "hidden",
    borderRadius: 30,
    borderWidth: 1,
  },
  athleteName: {
    color: "white",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowRadius: 3,
  },
  centerText: {
    marginHorizontal: 10,
    marginVertical: 20
  }
});

export default CoachCommunication;
