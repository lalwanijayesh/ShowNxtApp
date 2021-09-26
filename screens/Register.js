import React from "react";
import { View, Text, Button } from "react-native";

export default function Register() {
	return (
		<View>
			<Text>Register</Text>

			<TextInput placeholder="What is your name?" />

			<Text>Are you a coach or an athlete?</Text>

			<Button title="Coach" />
			<Button title="Athlete" />
		</View>
	);
}