import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { gql, useQuery } from "@apollo/client";

import ScreenNames from "../../constants/ScreenNames";

const GET_POSITIONS = gql`
  query PositionsBySport($sportId: ID!) {
    positionsBySport(sportId: $sportId) {
      positionId
      positionName
    }
  }
`;

const CoachPositionSelection = (props) => {

  const [positions, setPositions] = React.useState([]);

  const { loading, error, data } = useQuery(GET_POSITIONS, {
    variables: { sportId: props.route.params.sportId },
  });

  const incrementValue = (i) => {
    let currentPositions = [...positions];

    currentPositions[i].counter += 1;

    setPositions(currentPositions);
  };

  const decrementValue = (i) => {
    let currentPositions = [...positions];

    currentPositions[i].counter = Math.max(currentPositions[i].counter - 1, 0);

    setPositions(currentPositions);
  };

  if (positions.length === 0) {
    if (loading) return <Text>Loading</Text>;
    if (error) return <Text>Error</Text>;

    setPositions(
      data.positionsBySport.map(({ positionId, positionName }) => ({
        positionId,
        positionName,
        counter: 0,
      }))
    );
  }

  const isReadyToProceed = () => {
    for (let i = 0; i < positions.length; i += 1) {
      if (positions[i].counter > 0) {
        return true;
      }
    }

    return false;
  };

  const getFilledPositions = () => {
    let res = [];

    for (let i = 0; i < positions.length; i += 1) {
      if (positions[i].counter > 0) {
        res.push(positions[i]);
      }
    }

    return res;
  };

  return (
    <View style={styles.containerTitle}>
      <Text style={styles.startText}>Positions recruiting for Fall 2022</Text>

      <View style={styles.container}>
        <FlatList
          data={positions.map((element, i) => ({
            key: i.toString(),
          }))}
          renderItem={({ item }) => {
            let id = parseInt(item.key);

            return (
              <View style={styles.itemContainer}>
                <View style={styles.itemLabelContainer}>
                  <Text style={styles.itemLabel}>{positions[id].positionName}</Text>
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

                  <Text style={styles.itemCounter}>
                    {positions[id].counter}
                  </Text>

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

        <View style={styles.dash}>
        </View>

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
              ...props.route.params,
              positions: getFilledPositions(),
            });
          }}
        >
          <Text style={styles.buttonText}>Complete Profile</Text>
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
