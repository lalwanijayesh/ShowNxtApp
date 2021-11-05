import React from "react";
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
  return (
    <View style={styles.containerTitle}>
      <Text style={styles.startText}>Positions recruiting for Fall 2022</Text>
      <View style={styles.container}>
        <FlatList
          data={[
            { key: "Goalkeeper" },
            { key: "Defender" },
            { key: "Quarterback" },
            { key: "Fullback" },
            { key: "Left Offensive Guard" },
            { key: "Center" },
            { key: "Right Offensive Guard" },
            { key: "Right Offensive Tackle" },
            { key: "Left Offensive Tackle" },
            { key: "Tight End" },
            { key: "Wide Receiver" },
            { key: "shooting guard" },
            { key: "power forward" },
            { key: "small forward" },
            { key: "point guard" },
            { key: "Goalie" },
            { key: "Defensemen" },
            { key: "Winger" },
            { key: "Third Base" },
          ]}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <View style={styles.itemLabelContainer}>
                  <Text style={styles.itemLabel}>{item.key}</Text>
                </View>

                <View style={styles.itemIncrementContainer}>
                  <TouchableOpacity style={styles.itemButton}>
                    <Text style={styles.itemButtonPlus}>+</Text>
                  </TouchableOpacity>

                  <Text style={styles.itemCounter}>0</Text>

                  <TouchableOpacity style={styles.itemButton}>
                    <Text style={styles.itemButtonMinus}>-</Text>
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
    width: "100%",
    width: "80%",
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
    backgroundColor: "teal",
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
