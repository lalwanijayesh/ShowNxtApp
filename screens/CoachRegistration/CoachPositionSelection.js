import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

class CoachPositionSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPositions: [],
    };
  }

  _getCommonPositions() {
    return [
      "striker",
      "defender",
      "midfielder",
      "outfielder",
      "pitcher",
      "batter",
      "ballboy",
    ];
  }

  _selectPosition(positionName) {
    if (!this.state.selectedPositions.includes(positionName)) {
      let selectedPositions = this.state.selectedPositions;
      selectedPositions.push(positionName);

      this.setState({
        selectedPositions: selectedPositions,
      });
    }
  }

  render() {
    return (
      <View>
        <ScrollView style={styles.selectedPositionsContainer}>
          {this.state.selectedPositions.map((positionName) => {
            return <Text>{positionName}</Text>;
          })}
        </ScrollView>

        <View>
          <Text>Common Positions</Text>
          <ScrollView style={styles.commonPositionsContainer}>
            {this._getCommonPositions().map((positionName) => {
              return (
                <TouchableOpacity
                  onPress={() => this._selectPosition(positionName)}
                >
                  <Text>{positionName}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectedPositionsContainer: {
    height: 150,
  },

  commonPositionsContainer: {
    height: 150,
  },
});

export default CoachPositionSelection;
