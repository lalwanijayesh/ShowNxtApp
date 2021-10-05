import React from "react";
import { View, Text, Button } from "react-native";

const Welcome = ({ navigation }) => {
	return (
		<View>
			<Text>Welcome to ShowNxt</Text>
			<Button title="Register"
				onPress={() => navigation.navigate("Register")} />
			<Button title="Login"
				onPress={() => navigation.navigate("Login")} />
		</View>
	);
}

export default Welcome;