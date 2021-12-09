import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-ico-material-design";

const SCHOOL_SEARCH = gql`
  query SchoolSearch($term: String!) {
    schoolSearch(term: $term) {
      schoolId
      name
      location
    }
  }
`;

const SchoolsList = (props) => {
  const { loading, error, data } = useQuery(SCHOOL_SEARCH, {
    variables: { term: props.term },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  const PLACEHOLDER_IMG =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Northeastern_University.jpg/220px-Northeastern_University.jpg";

  return (
    <ScrollView style={styles.schoolsContainer}>
      {data.schoolSearch
        // .filter((school) => school.name.includes(props.term))
        .map(({ schoolId, name, location }) => (
          <View key={schoolId} style={styles.schoolContainer}>
            <Image
              style={styles.schoolImage}
              source={{ uri: PLACEHOLDER_IMG }}
            />
            <Text style={styles.schoolName}>{name}</Text>
          </View>
        ))}
    </ScrollView>
  );
};

const SchoolSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View style={styles.searchContainer}>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder={"Search for a school..."}
        style={styles.searchInput}
      />

      <SchoolsList term={searchTerm} />
      {/* NAVIGATION BAR ON THE BOTTOM OF PAGE */}
      <View style={styles.navContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.icon}>
            <Icon
              name="searching-magnifying-glass"
              height="40"
              width="40"
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.icon}
            onPress={() =>
              props.navigation.navigate(ScreenNames.COMMUNICATION_ATHLETE)
            }
          >
            <Icon
              name="black-envelope-email-symbol"
              height="40"
              width="40"
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            //onPress={() => navigation.navigate(ScreenNames.ATHLETE_PROFILE)}
          >
            <Icon name="two-men" height="40" width="40" color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* NAVIGATION BAR ON THE BOTTOM OF PAGE */}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  icon: {
    padding: 14,
  },

  navBar: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: `#000000`,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  navContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: -715,
    color: `#000000`,
  },

  searchInput: {
    marginTop: "30%",
    width: 237,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
  },

  schoolsContainer: {
    marginTop: "5%",
    width: "90%",
  },

  schoolContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  schoolImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },

  schoolName: {
    marginLeft: 10,
  },
});

export default SchoolSearch;
