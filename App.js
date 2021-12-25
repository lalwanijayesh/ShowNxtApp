import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloProvider } from "@apollo/client";
import { LogBox } from "react-native";

import ScreenNames from "./src/constants/ScreenNames";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { serverUrl } from "./src/constants/config";

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
import AthleteComplete from "./src/screens/AthleteRegister/AthleteComplete";
import AthleteEmailPassword from "./src/screens/AthleteRegister/AthleteEmailPassword";
import EmailConfirmation from "./src/screens/AthleteRegister/AthleteEmailConfirmation";
import SchoolInfo from "./src/screens/ApplyToSchool/SchoolInfo";
import DisplayAthleteProfile from "./src/screens/DisplayAthlete/DisplayAthleteProfile";
import CoachFlowTab from "./src/screens/CoachFlowTab";
import AthleteFlowTab from "./src/screens/AthleteFlow/AthleteFlowTab";
import UserIdContext from "./src/AppContext";
import Login from "./src/screens/Login";
const Stack = createNativeStackNavigator();

// Ignore timer related warnings from firebase core APIs
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
LogBox.ignoreLogs(["VirtualizedLists should never be nested inside"]);
LogBox.ignoreAllLogs();

const client = new ApolloClient({
  uri: serverUrl,
  cache: new InMemoryCache(),
});

export default function App() {
  const [userId, setUserId] = useState(undefined);

  return (
    <ApolloProvider client={client}>
      <UserIdContext.Provider value={[userId, setUserId]}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={ScreenNames.WELCOME}>
            <Stack.Screen
              name={ScreenNames.WELCOME}
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
                name={ScreenNames.LOGIN}
                component={Login}
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
              name={ScreenNames.COACH_TAB_FLOW}
              component={CoachFlowTab}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name={ScreenNames.ATHLETE_TAB_FLOW}
              component={AthleteFlowTab}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name={ScreenNames.EMAIL_PASSWORD}
              component={AthleteEmailPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ScreenNames.SCHOOL_INFO}
              component={SchoolInfo}
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

            {/* <Stack.Screen
            name={ScreenNames.ATHLETE_COMMUNICATION}
            component={CommunicationAthlete}
            options={{ headerShown: false }}
          /> */}

            {/* <Stack.Screen
            name={ScreenNames.SCHOOL_SEARCH}
            component={SchoolSearch}
            options={{ headerShown: false }}
          /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </UserIdContext.Provider>
    </ApolloProvider>
  );
}
