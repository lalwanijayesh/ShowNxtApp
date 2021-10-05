import React from "react";
import { View, Text, TextInput, Button } from "react-native";

const Login = ({ navigation }) => {
	return (
		<View>
			
			<TextInput placeholder="Enter your email" />

			<TextInput placeholder="Enter your password" />

			<Button title="Next" 
			/>
		</View>
	);
}

export default Login;