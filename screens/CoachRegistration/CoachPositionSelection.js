import React, { useCallback } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Touchable,
  TextInput,
  FlatList,
} from "react-native";

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

  return (
    <View style={styles.containerTitle}>
      <Text style={styles.startText}>Positions recruiting for Fall 2022</Text>

      <View style={styles.container}>
        <FlatList
          data={positions.map((element, i) => {
            return { key: i };
          })}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <View style={styles.itemLabelContainer}>
                  <Text style={styles.itemLabel}>{positions[item.key]}</Text>
                </View>

                <View style={styles.itemIncrementContainer}>
                  <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => {
                      decrementValue(item.key);
                    }}
                  >
                    <Text style={styles.itemButtonMinus}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.itemCounter}>{counters[item.key]}</Text>

                  <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => {
                      incrementValue(item.key);
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    height: "50%",
  },
  containerTitle: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
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
});

export default CoachPositionSelection;
