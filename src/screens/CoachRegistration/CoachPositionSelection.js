import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

import ScreenNames from "../../constants/ScreenNames";

const CoachPositionSelection = (props) => {
  let positions = [
    "Goalkeeper",
    "Defender",
    "Quarterback",
    "Fullback",
    "Left Offensive Guard",
    "Center",
    "Right Offensive Guard",
    "Left Offensive Tackle",
    "Right Offensive Tackle",
    "Tight End",
    "Wide Receiver",
    "Shooting Guard",
    "Power Forward",
    "Small Forward",
    "Point Guard",
    "Goalie",
    "Winger",
    "Third Base",
  ];

  let initialCounters = [];
  for (let i = 0; i < positions.length; i += 1) {
    initialCounters.push(0);
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

  const isReadyToProceed = () => {
    for (let i = 0; i < positions.length; i += 1) {
      if (counters[i] > 0) {
        return true;
      }
    }

    return false;
  };

  return (
    <View style={styles.containerTitle}>
      <Text style={styles.startText}>Positions recruiting for Fall 2022</Text>

      <View style={styles.container}>
        <FlatList
          data={positions.map((element, i) => {
            return { key: i.toString() };
          })}
          renderItem={({ item }) => {
            let id = parseInt(item.key);

            return (
              <View style={styles.itemContainer}>
                <View style={styles.itemLabelContainer}>
                  <Text style={styles.itemLabel}>{positions[id]}</Text>
                </View>

                <View style={styles.itemIncrementContainer}>
                  <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => {
                      decrementValue(id);
                    }}
                  >
                    <Text style={styles.itemButtonMinus}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.itemCounter}>{counters[id]}</Text>

                  <TouchableOpacity
                    style={styles.itemButton}
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

      <View style={styles.progressContainer}>
        <View style={styles.circle}>
          <Text style={styles.oneText}>✓</Text>
        </View>

        <View style={styles.dash}></View>

        <View style={styles.circle1}>
          <Text style={styles.oneText}>2</Text>
        </View>
      </View>

      <View style={styles.textUnderCircles}>
        <View>
          <Text style={styles.SandRText}>Sports</Text>
        </View>
        <View>
          <Text style={styles.SandRText}>Position</Text>
        </View>
      </View>

      {isReadyToProceed() && (
        <TouchableOpacity
          style={styles.buttonReady}
          onPress={() => {
            props.navigation.navigate(ScreenNames.COACH_COMPLETE, {
              fullName: props.route.params.fullName,
              email: props.route.params.email,
              password: props.route.params.password,
              uni: props.route.params.uni,
              sport: props.route.params.sport,
              jobTitle: props.route.params.jobTitle,
            });
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  progressContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 50,
  },

  textUnderCircles: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: -65,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "mediumseagreen",
    margin: 5,
    display: "flex",
    alignItems: "center",
  },

  circle1: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "grey",
    margin: 5,
  },
  oneText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  dash: {
    width: 30,
    height: 2,
    backgroundColor: "mediumseagreen",
    textAlign: "center",
  },

  SandRText: {
    color: "black",
    fontSize: 10,
    textAlign: "center",
    margin: 20,
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    height: "40%",
  },
  containerTitle: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    margin: 30,
  },
  startText: {
    fontWeight: "bold",
    textAlign: "center",
    margin: 90,
    fontSize: 18,
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
  },

  itemIncrementContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  itemLabel: {
    padding: 10,
    fontSize: 18,
  },

  itemCounter: {
    fontSize: 20,
  },

  itemButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  itemButtonPlus: {
    fontSize: 40,
  },

  itemButtonMinus: {
    fontSize: 45,
  },

  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },

  buttonReady: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 70,
    width: 237,
    backgroundColor: "#000000",
  },
});

export default CoachPositionSelection;
