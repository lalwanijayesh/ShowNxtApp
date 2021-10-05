import React from "react";
import { View, Text, TextInput, Button } from "react-native";

const EmailPass = () => {
	return (
		<View>
			<Text>Coach Register</Text>

			<TextInput placeholder="Email?" />

			<TextInput placeholder="Password?" />

			<Button title="Next" />
		</View>
	);
}
export default EmailPass;