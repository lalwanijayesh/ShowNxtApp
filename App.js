import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "./screens/Welcome";
import AthleteCoachSelection from "./screens/AthleteCoachSelection";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmailPassScreen from "./screens/EmailPass";

import VerificationScreen from "./screens/CoachRegistration/Verification";
import CoachInfoRegistration from "./screens/CoachRegistration/CoachInfoRegistration";
import CoachPositionSelection from "./screens/CoachRegistration/CoachPositionSelection";
import CompleteProfile1 from "./screens/CoachRegistration/CompleteProfile1";

import ScreenNames from './src/screens/ScreenNames';
import AthleteSportInfo from './src/screens/AthleteRegister/AthleteSportInfo';
import AthleteHeightWeight from './src/screens/AthleteRegister/AthleteHeightWeight';
import AthleteAcademic from './src/screens/AthleteRegister/AthleteAcademic';
import AthleteProfile from './src/screens/AthleteProfile/AthleteProfile';
import EmailPassword from './src/screens/AthleteRegister/EmailPassword';
import EmailConfirmation from './src/screens/AthleteRegister/AthleteEmailConfirmation';

const Stack = createNativeStackNavigator();


export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AthleteCoachSelection"
          component={AthleteCoachSelection}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="EmailPass"
          component={EmailPassScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Verification"
          component={VerificationScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CoachInfoRegistration"
          component={CoachInfoRegistration}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CoachPositionSelection"
          component={CoachPositionSelection}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CompleteProfile1"
          component={CompleteProfile1}
          options={{
            headerShown: false,
          }}
        />

         <Stack.Screen name={ScreenNames.EMAIL_PASSWORD} 
                      component={EmailPassword} 
                      options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.EMAIL_CONFIRMATION} 
                      component={EmailConfirmation} 
                      options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.ATHLETE_SPORT_INFO} 
                      component={AthleteSportInfo} 
                      options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.ATHLETE_HEIGHT_WEIGHT} 
                      component={AthleteHeightWeight} 
                      options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.ATHLETE_ACADEMIC} 
                      component={AthleteAcademic} 
                      options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.ATHLETE_PROFILE} 
                      component={AthleteProfile} 
                      options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}