import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

const SearchProfile = () => {
  return (
      <View style={styles.container}>
        <Text style={styles.buttonText}>
          SEARCH PROFILE PAGE
        </Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    margin: 100,
  }
});

export default SearchProfile;