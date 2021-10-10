import React from "react";
import { View, Text, TextInput, Button } from "react-native";

const EmailPassScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPass] = React.useState("");

  return (
    <View>
      <Text>Coach Register</Text>
      <TextInput placeholder="Email?" />
      <TextInput placeholder="Password?" />
      <Button title="Next" />
      onPress={() => setEmail(email)}
      onPress={() => setPass(password)}
    </View>
  );
};
export default EmailPass;
