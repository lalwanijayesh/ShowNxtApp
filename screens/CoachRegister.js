import React from "react";
import { View, Text, TextInput, Button } from "react-native";

const CoachRegister = ({navigation}) => {
	return (
		<View>
			<Text>Coach Register</Text>

			<TextInput placeholder="What is your name?" />

			<TextInput placeholder="What school do you coach for?" />

			<TextInput placeholder="What sport do you coach?" />

			<TextInput placeholder="What are your recruiting requirements?" />

			<TextInput placeholder="What is your role at the school?" />

			<Button title="Next" 
			onPress={() => navigation.navigate("EmailPass")}
			/>
		</View>
	);
}

export default CoachRegister;