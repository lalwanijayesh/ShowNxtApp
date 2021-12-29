import {gql, useLazyQuery} from "@apollo/client";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ScreenNames from "../../constants/ScreenNames";
import schoolImg from "../../../assets/school.jpg"

const SCHOOL_SEARCH = gql`
  query SchoolSearch($term: String!) {
    schoolSearch(term: $term) {
      schoolId
      name
      location
    }
  }
`;

const SchoolSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [schoolsList, setSchoolsList] = useState([]);

  const [searchSchools] = useLazyQuery(SCHOOL_SEARCH, {
    onError: error => console.log(error)
  });

  useEffect(() => {
    searchSchools({variables: {term: ''}})
        .then(r => setSchoolsList(r.data.schoolSearch));
  }, []);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        value={searchTerm}
        onChangeText={term => {
          setSearchTerm(term);
          searchSchools({variables: {term: term}})
              .then(r => setSchoolsList(r.data.schoolSearch));
        }}
        placeholder={"Search for a school..."}
        style={styles.searchInput}
      />
      {schoolsList.length !== 0 ?
      <ScrollView style={styles.schoolsContainer}>
        {schoolsList
            .map(({ schoolId, name, location }) => (
                <TouchableOpacity
                    key={schoolId}
                    style={styles.schoolContainer}
                    onPress={() =>
                        props.navigation.navigate(ScreenNames.SCHOOL_INFO, {
                          ...props.route.params,
                          schoolId,
                          name,
                          location,
                        })
                    }
                >
                  <Image
                      style={styles.schoolImage}
                      source={schoolImg}
                  />
                  <Text style={styles.schoolName}>{name}</Text>
                </TouchableOpacity>
            ))}
      </ScrollView> :
      <Text style={styles.displayText}>
        {"No results to display.\nTry changing search query."}
      </Text>}
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
    margin: 10
  },
  displayText: {
    padding: 10,
    margin: 10,
    textAlign: 'center'
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
