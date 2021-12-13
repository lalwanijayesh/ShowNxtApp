import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloProvider } from "@apollo/client";
import { LogBox } from 'react-native';

import ScreenNames from "./src/constants/ScreenNames";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import serverUrl from "./src/constants/graphql";
import SchoolSearch from "./src/screens/SchoolSearch";

// Screen imports
import WelcomeScreen from "./src/screens/WelcomeScreen";
import AthleteCoachSelection from "./src/screens/AthleteCoachSelection";
import EmailPassScreen from "./src/screens/CoachRegistration/CoachEmailPass";
import VerificationScreen from "./src/screens/CoachRegistration/Verification";
import CoachInfoRegistration from "./src/screens/CoachRegistration/CoachInfoRegistration";
import CoachPositionSelection from "./src/screens/CoachRegistration/CoachPositionSelection";
import CompleteProfilePage from "./src/screens/CoachRegistration/CompleteProfilePage";
import AthleteSportInfo from "./src/screens/AthleteRegister/AthleteSportInfo";
import AthleteHeightWeight from "./src/screens/AthleteRegister/AthleteHeightWeight";
import AthleteAcademic from "./src/screens/AthleteRegister/AthleteAcademic";
import AthleteComplete from './src/screens/AthleteRegister/AthleteComplete';
import AthleteEmailPassword from "./src/screens/AthleteRegister/AthleteEmailPassword";
import EmailConfirmation from "./src/screens/AthleteRegister/AthleteEmailConfirmation";
import DisplayAthleteDeclineAccept from "./src/screens/DisplayAthlete/DisplayAthleteDeclineAccept";
import CommunicationPage from "./src/screens/DisplayAthlete/CommunicationPage";
import ProfilePageCoach from "./src/screens/DisplayAthlete/ProfilePageCoach";
import SearchForCoach from "./src/screens/DisplayAthlete/SearchForCoach";
import DisplayAthleteProfile from "./src/screens/DisplayAthlete/DisplayAthleteProfile";
const Stack = createNativeStackNavigator();

// Ignore timer related warnings from firebase core APIs
LogBox.ignoreLogs(['Setting a timer for a long period of time']);

// TODO: move out to its own file, but it didn't work when I tried to do it
const client = new ApolloClient({
  uri: serverUrl,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ScreenNames.WELCOME}>
          <Stack.Screen
            name={ScreenNames.WELCOME}
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={ScreenNames.ATHLETE_COACH_SELECTION}
            component={AthleteCoachSelection}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={ScreenNames.COACH_EMAIL_PASS}
            component={EmailPassScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={ScreenNames.COACH_VERIFICATION}
            component={VerificationScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={ScreenNames.COACH_INFO_REGISTRATION}
            component={CoachInfoRegistration}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={ScreenNames.COACH_POSITION_SELECTION}
            component={CoachPositionSelection}
            options={{ headerShown: false }}
          />

          {/* NEW, NOT SURE IF WORKS */}
          <Stack.Screen
            name={ScreenNames.COACH_COMPLETE}
            component={CompleteProfilePage}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={ScreenNames.DISPLAY_ATHLETE_PROFILE}
            component={DisplayAthleteProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={ScreenNames.DISPLAY_ATHLETE_DECLINE_ACCEPT}
            component={DisplayAthleteDeclineAccept}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ScreenNames.SEARCH_FOR_COACH}
            component={SearchForCoach}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={ScreenNames.COMMUNICATION_PAGE}
            component={CommunicationPage}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={ScreenNames.PROFILE_PAGE_COACH}
            component={ProfilePageCoach}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={ScreenNames.EMAIL_PASSWORD}
            component={AthleteEmailPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ScreenNames.EMAIL_CONFIRMATION}
            component={EmailConfirmation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ScreenNames.ATHLETE_SPORT_INFO}
            component={AthleteSportInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ScreenNames.ATHLETE_HEIGHT_WEIGHT}
            component={AthleteHeightWeight}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ScreenNames.ATHLETE_ACADEMIC}
            component={AthleteAcademic}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ScreenNames.ATHLETE_COMPLETE}
            component={AthleteComplete}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={ScreenNames.SCHOOL_SEARCH}
            component={SchoolSearch}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
