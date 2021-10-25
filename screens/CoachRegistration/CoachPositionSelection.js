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
} from "react-native";

const SelectedPosition = (props) => {
  return (
    <View style={styles.selectedPositionContainer}>
      <Text style={styles.selectedPositionLabel}>{props.name}</Text>
      <TouchableOpacity
        style={styles.unselectButton}
        onPress={() => props.removeCallback()}
      >
        <Text style={styles.unselectLabel}>X</Text>
      </TouchableOpacity>
    </View>
  );
};
class CoachPositionSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPositions: [],
      newPositionName: "",
    };

    this._selectPosition = this._selectPosition.bind(this);
    this._setNewPositionName = this._setNewPositionName.bind(this);
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
        newPositionName: this.state.newPositionName,
      });
    }
  }

  _unselectPosition(positionName) {
    if (this.state.selectedPositions.includes(positionName)) {
      let selectedPositions = this.state.selectedPositions;
      const index = selectedPositions.indexOf(positionName);
      selectedPositions.splice(index, 1);

      this.setState({
        selectedPositions: selectedPositions,
        newPositionName: this.state.newPositionName,
      });
    }
  }

  _setNewPositionName(newName) {
    this.setState({
      selectedPositions: this.state.selectedPositions,
      newPositionName: newName,
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.selectedPositionsContainer}>
          <Text>Selected Positions</Text>

          <ScrollView style={styles.selectedPositionsScroll}>
            {this.state.selectedPositions.map((positionName) => {
              return (
                <SelectedPosition
                  name={positionName}
                  removeCallback={() => {
                    this._unselectPosition(positionName);
                  }}
                />
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.commonPositionsContainer}>
          <Text>Common Positions</Text>
          <ScrollView style={styles.commonPositionsScroll}>
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

        <View>
          <TextInput
            value={this.state.newPositionName}
            onChangeText={this._setNewPositionName}
            placeholder="Enter new position name"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this._selectPosition(this.state.newPositionName);
              this._setNewPositionName("");
            }}
          >
            <Text style={styles.buttonText}>Add New Position</Text>
          </TouchableOpacity>
        </View>

        {this.state.selectedPositions.length > 0 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate(
                "CoachPositionNumbers",
                Object.assign(this.props.route.params, {
                  positions: this.state.selectedPositions,
                })
              );
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
  },

  selectedPositionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 200,
    width: "80%",
  },

  selectedPositionsScroll: {
    height: 300,
    width: "100%",
  },

  selectedPositionContainer: {
    width: 120,
    height: 35,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 30,
  },

  selectedPositionLabel: {
    // width: 80,
    height: 30,
    paddingLeft: 10,
  },

  unselectButton: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    // padding: 10,
    margin: 30,
    width: 20,
    height: 20,
    // backgroundColor: "#fff",
    paddingRight: 10,
  },

  unselectLabel: {
    // textAlign: "center",
  },

  commonPositionsContainer: {
    height: 150,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    width: "80%",
  },

  commonPositionsScroll: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  button: {
    display: "flex",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 30,
    width: 237,
    backgroundColor: "#fff",
  },

  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CoachPositionSelection;
