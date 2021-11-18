import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ScreenNames from './src/constants/ScreenNames';

// Screen imports
import WelcomeScreen from "./src/screens/WelcomeScreen";
import AthleteCoachSelection from "./src/screens/AthleteCoachSelection";
import EmailPassScreen from './src/screens/CoachRegistration/CoachEmailPass';
import VerificationScreen from "./src/screens/CoachRegistration/Verification";
import CoachInfoRegistration from "./src/screens/CoachRegistration/CoachInfoRegistration";
import CoachPositionSelection from "./src/screens/CoachRegistration/CoachPositionSelection";
import CompleteProfile1 from "./src/screens/CoachRegistration/CompleteProfile1";
import AthleteSportInfo from './src/screens/AthleteRegister/AthleteSportInfo';
import AthleteHeightWeight from './src/screens/AthleteRegister/AthleteHeightWeight';
import AthleteAcademic from './src/screens/AthleteRegister/AthleteAcademic';
import AthleteProfile from './src/screens/AthleteProfile/AthleteProfile';
import AthleteEmailPassword from './src/screens/AthleteRegister/AthleteEmailPassword';
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
                      component={AthleteEmailPassword} 
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