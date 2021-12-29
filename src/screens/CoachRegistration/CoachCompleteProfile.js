import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Platform,
  FlatList,
  Alert
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ScreenNames from "../../constants/ScreenNames";
import {gql, useMutation, useQuery} from "@apollo/client";

const GET_SCHOOLS_AND_SPORTS = gql`
  query GetSchoolsAndSports {
    schools {
      schoolId
      name
    }

    sports {
      sportId
      sportName
      gender
    }
  }
`;
const CREATE_COACH = gql`
mutation Mutation($userId: ID!, $schoolId: ID!, $sportId: ID!, $firstName: String!, $lastName: String!, 
  $openPositionIds: [ID!], $openPositionValues: [Int!]) {
  createCoach(userId: $userId, schoolId: $schoolId, sportId: $sportId, firstName: $firstName, lastName: $lastName, 
    openPositionIds: $openPositionIds, openPositionValues: $openPositionValues) {
      userId
      firstName
      lastName
      schoolId
      sportId
  }
}
`

const splitName = (name) => {
  const listOfStrings = name.split(" ");
  return {
    firstName: listOfStrings[0],
    lastName: listOfStrings.length > 1 ? listOfStrings[listOfStrings.length - 1] : "",
  };
};

const CoachCompleteProfile = (props) => {

  const [firstName, setFirstName] = React.useState(
    splitName(props.route.params.fullName).firstName
  );
  const [lastName, setLastName] = React.useState(
    splitName(props.route.params.fullName).lastName
  );
  const [bio, setBio] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState(props.route.params.jobTitle);

  const [createCoach] = useMutation(CREATE_COACH, {
    onError: error => {
      Alert.alert("An error occurred during registration. Please contact administrator.");
    }
  });

  const [uniVisible, setUniVisible] = React.useState(false);
  const [uni, setUni] = React.useState(props.route.params.schoolId);
  const [uniList, setUniList] = React.useState([]);

  const [sportVisible, setSportVisible] = React.useState(false);
  const [sport, setSport] = React.useState(props.route.params.sportId);
  const [sportList, setSportList] = React.useState([]);

  const onUniOpen = useCallback(() => {
    setSportVisible(false);
  }, []);

  const onSportOpen = useCallback(() => {
    setUniVisible(false);
  }, []);

  const { loading, error, data } = useQuery(GET_SCHOOLS_AND_SPORTS);

  if (uniList.length === 0) {
    if (loading) return <Text style={{textAlign: 'center'}}>Loading</Text>;
    if (error) return <Text style={{textAlign: 'center'}}>Error</Text>;

    setUniList(
        data.schools.map(({ schoolId, name }) => ({
          label: name,
          value: schoolId,
        }))
    );

    setSportList(
        data.sports.map(({ sportId, sportName, gender }) => ({
          label: sportName,
          value: sportId,
        }))
    );
  }

  const [positions, setPositions] = React.useState(props.route.params.positions);

  let initialCounters = [];
  for (let i = 0; i < positions.length; i += 1) {
    initialCounters.push(positions[i].counter);
  }

  const [counters, setCounters] = React.useState(initialCounters);

  const incrementValue = (i) => {
    let currentCounters = {};
    Object.assign(currentCounters, counters);
    currentCounters[i] += 1;
    setCounters(currentCounters);
  };

  const decrementValue = (i) => {
    let currentCounters = {};
    Object.assign(currentCounters, counters);
    currentCounters[i] = Math.max(currentCounters[i] - 1, 0);
    setCounters(currentCounters);
  };

  return (
    <View style={{ backgroundColor: "#FFFFFF" }}>
      <ScrollView style={{ marginBottom: 39 }}>
        <View style={styles.infoContainer}>
          <View style={styles.avaContainer}>
            <View style={styles.avatar}>
              {/* TODO add profile avatar */}
            </View>
            <TouchableOpacity>
              <Text>add photo</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 45 }}>
            <Text style={[styles.title, { color: "#000000" }]}>Bio</Text>
            <TextInput
              maxLength={100}
              multiline={true}
              onChangeText={setBio}
              value={bio}
              placeholderTextColor={"#000000"}
              placeholder="Give recruits background about yourself..."
            />
          </View>

          <View style={[styles.dropdownContainer, { marginTop: 50 }]}>
            <View>
              <Text style={[styles.title, { color: "#555555" }]}>
                First Name
              </Text>
              <TextInput
                style={[styles.boxSmallBorder, styles.boxSmallDimensions]}
                autoCorrect={false}
                onChangeText={setFirstName}
                value={firstName}
                placeholderTextColor={"#000000"}
                placeholder="Name"
              />
            </View>

            <View>
              <Text style={[styles.title, { color: "#555555" }]}>
                Last Name
              </Text>
              <TextInput
                style={[styles.boxSmallBorder, styles.boxSmallDimensions]}
                autoCorrect={false}
                onChangeText={setLastName}
                value={lastName}
                placeholderTextColor={"#000000"}
                placeholder="LastName"
              />
            </View>
          </View>

          <View style={{ marginTop: 14 }}>
            <Text style={[styles.title, { color: "#555555" }]}>University</Text>
            <DropDownPicker
              searchable={true}
              searchPlaceholder="Search..."
              placeholder={"University"}
              open={uniVisible}
              value={uni}
              items={uniList}
              setOpen={setUniVisible}
              setValue={setUni}
              setItems={setUniList}
              onOpen={onUniOpen}
              style={[{ height: 30 }]}
              dropDownDirection="TOP"
            />
          </View>

          <View style={[styles.dropdownContainer, { marginTop: 14 }]}>
            <View>
              <Text style={[styles.title, { color: "#555555" }]}>
                Coaching Sport
              </Text>
              <DropDownPicker
                searchable={true}
                searchPlaceholder="Search..."
                placeholder={"Sport"}
                open={sportVisible}
                value={sport}
                items={sportList}
                setOpen={setSportVisible}
                setValue={setSport}
                setItems={setSportList}
                onOpen={onSportOpen}
                style={[styles.boxSmallDimensions, { height: 30 }]}
                dropDownDirection="TOP"
              />
            </View>

            <View>
              <Text style={[styles.title, { color: "#555555" }]}>
                Job Title
              </Text>
              <TextInput
                style={[styles.boxSmallBorder, styles.boxSmallDimensions]}
                autoCorrect={false}
                onChangeText={setJobTitle}
                value={jobTitle}
                placeholderTextColor={"#000000"}
                placeholder="Job"
              />
            </View>
          </View>

          <Text style={[styles.title, { color: "#000000", marginTop: 47 }]}>
            Recruiting positions for
          </Text>
        </View>

        <View marginTop={14}>
          <FlatList
            data={positions}
            renderItem={({ item, index }) => {
              let id = parseInt(index);
              return (
                <View
                  style={[
                    styles.itemContainer,
                    index === (positions.length - 1).toString()
                      ? { borderColor: "rgba(0, 0, 0, 0.2)", borderWidth: 1 }
                      : {
                          borderTopColor: "rgba(0, 0, 0, 0.2)",
                          borderTopWidth: 1,
                        },
                  ]}
                >
                  <View style={styles.itemLabelContainer}>
                    <Text style={styles.itemLabel}>{item.positionName}</Text>
                  </View>

                  <View style={styles.itemIncrementContainer}>
                    <TouchableOpacity
                      style={[styles.itemButton, styles.borderMinusSign]}
                      onPress={() => {
                        decrementValue(id);
                      }}
                    >
                      <Text style={styles.itemButtonMinus}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.itemCounter}>{counters[id]}</Text>

                    <TouchableOpacity
                      style={[styles.itemButton, styles.borderPlusSign]}
                      onPress={() => {
                        incrementValue(id);
                      }}
                    >
                      <Text style={styles.itemButtonPlus}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <Text style={styles.textAddMore}>+ add more positions</Text>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => {
            createCoach({
              variables: {
                userId: props.route.params.userId,
                schoolId: uni,
                sportId: sport,
                firstName: firstName,
                lastName: lastName,
                openPositionIds: positions.map(obj => obj.positionId),
                openPositionValues: Object.values(counters)
              }
            }).then(res => {
              console.log(res.data);
              props.navigation.navigate(ScreenNames.COACH_HOMEPAGE, props.route.params);
            });
          }}
        >
          <Text style={styles.nextText}>{"Find Recruits"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginHorizontal: 22,
  },
  avaContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    marginTop: 80,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
  },
  title: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxSmallBorder: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "#000000",
  },
  boxSmallDimensions: {
    paddingVertical: Platform.select({
      ios: 7,
    }),
    paddingLeft: 9,
    width: (Dimensions.get("screen").width - 67) / 2,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
  itemLabelContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 31,
  },
  itemIncrementContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 19,
    borderRadius: 5,
    borderColor: "#000000",
    borderWidth: 1,
    height: 35,
  },
  itemLabel: {
    padding: 10,
    fontSize: 14,
    lineHeight: 16,
  },
  itemCounter: {
    fontSize: 16,
    lineHeight: 16,
    paddingHorizontal: 23,
  },
  itemButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemButtonPlus: {
    fontSize: 25,
  },
  borderMinusSign: {
    borderRightColor: "#000000",
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    borderRightWidth: 1,
    width: 35,
    height: 35,
  },
  borderPlusSign: {
    borderLeftColor: "#000000",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftWidth: 1,
    width: 35,
    height: 35,
  },
  itemButtonMinus: {
    fontSize: 25,
  },
  textAddMore: {
    textDecorationLine: "underline",
    marginRight: 19,
    marginTop: 15,
    lineHeight: 16,
    fontSize: 10,
    alignSelf: "flex-end",
    color: "#555555",
  },
  nextBtn: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 69,
    marginTop: 53,
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
});

export default CoachCompleteProfile;
