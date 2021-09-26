import React from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function AthleteRegister() {
	return (
		<View>
			<Text>Athlete Register</Text>

			<TextInput placeholder="What sports do you play?" />
			<TextInput placeholder="What are your measurables?" />
			<TextInput placeholder="How is your academic performance?" />
			<TextInput placeholder="Athletic pedigree?" />
			<TextInput placeholder="Upload photos of yourself playing" />
			<TextInput placeholder="Schedule of upcoming games" />

			<Button title="Next" />
		</View>
	);
}