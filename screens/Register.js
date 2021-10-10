import React from "react";
import { View, Text, Button } from "react-native";

const RegisterScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Register</Text>

      <Text>Are you a coach or an athlete?</Text>

      <Button
        title="Coach"
        onPress={() => navigation.navigate("CoachRegister")}
      />
      <Button
        title="Athlete"
        onPress={() => navigation.navigate("AthleteRegister")}
      />
    </View>
  );
};

export default Register;
