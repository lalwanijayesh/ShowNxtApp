import React from "react";
import { View, Text, Button } from "react-native";

const Welcome = ({ navigation }) => {
	return (
		<View>
			<Text>Welcome to ShowNxt</Text>
			<Button title="Register" />
			<Button title="Login" />
		</View>
	);
}

export default Welcome;