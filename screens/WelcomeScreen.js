import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const WelcomeScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>Welcome to ShowNxt</Text>
			<Button title="Register"
				onPress={() => navigation.navigate("Register")} />
			<Button title="Login" />
		</View>
	);
}
WelcomeScreen.options = {
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: "center"
	},
});

export default WelcomeScreen;