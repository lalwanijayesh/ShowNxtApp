import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
//import ScreenNames from "../constants/ScreenNames";
import Icon from "react-native-ico-material-design";
import college from "../../../assets/uni.jpg";

const SchoolInfo = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <Image style={styles.photoContainer} source={college} />
      <Text style={styles.collegeNameText}>Northeastern University</Text>
      <Text style={styles.locationText}>📍 Boston, MA</Text>
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
      <View style={styles.containerPosition}>
        <Text style={styles.positionsText}>Men's Soccer Team</Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.positionsText}>Goalkeeper</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerPosition2}>
        <Text style={styles.positionsText}>Men's Soccer Team</Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.positionsText}>Striker</Text>
        </TouchableOpacity>
      </View>
      <View style={visible ? styles.applyView : styles.hidden}>
        <Text style={styles.positionText}>GOALKEEPER</Text>
        <Text style={styles.teamText}>Men's Soccer Team</Text>
        <Text style={styles.oneReq}> ✓ Minimum 3.0 GPA</Text>
        <Text style={styles.twoReq}> ✓ 1100+ SATs</Text>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => setVisible(false)}
        >
          <Text style={styles.applyText}>APPLY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
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
    margin: 50,
  },
  containerPosition: {
    // backgroundColor: "yellow",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "red",
    width: "80%",
    margin: 75,
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
    margin: -40,
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
    bottom: 0,
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
