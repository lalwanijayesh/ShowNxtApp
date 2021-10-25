import React from "react";

import { View, Text } from "react-native";

class CoachPositionNumbers extends React.Component {
  constructor(props) {
    super(props);

    let numbersMap = new Map();
    for (let i = 0; i < this.props.route.params.positions.length; i += 1) {
      numbersMap.set(this.props.route.params.positions[i], 0);
    }

    this.state = {
      numbersMap: numbersMap,
    };

    this._setCount = this._setCount.bind(this);
  }

  _setCount(positionName, value) {
    let numbersMap = this.state.numbersMap;
    numbersMap.set(positionName, count);

    this.setState({
      numbersMap: numbersMap,
    });
  }

  render() {
    return (
      <View>
        {this.props.route.params.positions.map((positionName) => {
          const count = this.state.numbersMap.get(positionName);

          return (
            <Text key={positionName}>
              {positionName}: {count}
            </Text>
          );
        })}
      </View>
    );
  }
}

export default CoachPositionNumbers;
