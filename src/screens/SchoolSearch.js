import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Text, View, TextInput, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const GET_SCHOOLS = gql`
  query GetSchools {
    schools {
      schoolId
      name
      location
    }
  }
`;

const SchoolsList = (props) => {
  const { loading, error, data } = useQuery(GET_SCHOOLS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  // <ScrollView style={styles.schoolsContainer}>
  //   {schools.map(({ schoolName, schoolImg }) => (
  //     <View style={styles.schoolContainer}>
  //       <Image style={styles.schoolImage} source={{ uri: schoolImg }} />
  //     </View>
  //   ))}
  // </ScrollView>

  const PLACEHOLDER_IMG =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Northeastern_University.jpg/220px-Northeastern_University.jpg";

  // console.log(data.schools);

  return (
    <ScrollView style={styles.schoolsContainer}>
      {data.schools
        .filter((school) => school.name.includes(props.term))
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
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  searchInput: {
    marginTop: "30%",
  },

  schoolsContainer: {
    marginTop: "5%",
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
