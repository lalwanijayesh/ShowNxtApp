import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloProvider } from "@apollo/client";
import { LogBox } from "react-native";

import ScreenNames from "./src/constants/ScreenNames";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { serverUrl } from "./src/constants/config";

// Screen imports
import Welcome from "./src/screens/Welcome";
import Login from "./src/screens/Login";
import AthleteCoachSelection from "./src/screens/AthleteCoachSelection";
import CoachEmailPassword from "./src/screens/CoachRegistration/CoachEmailPassword";
import CoachEmailVerification from "./src/screens/CoachRegistration/CoachEmailVerification";
import CoachSportInfo from "./src/screens/CoachRegistration/CoachSportInfo";
import CoachPositionSelection from "./src/screens/CoachRegistration/CoachPositionSelection";
import CoachCompleteProfile from "./src/screens/CoachRegistration/CoachCompleteProfile";
import AthleteEmailPassword from "./src/screens/AthleteRegistration/AthleteEmailPassword";
import AthleteEmailVerification from "./src/screens/AthleteRegistration/AthleteEmailVerification";
import AthleteSportInfo from "./src/screens/AthleteRegistration/AthleteSportInfo";
import AthleteHeightWeight from "./src/screens/AthleteRegistration/AthleteHeightWeight";
import AthleteAcademic from "./src/screens/AthleteRegistration/AthleteAcademic";
import AthleteCompleteProfile from "./src/screens/AthleteRegistration/AthleteCompleteProfile";
import CoachHomepage from "./src/screens/CoachEvaluation/CoachHomepage";
import AthleteHomepage from "./src/screens/AthleteApplication/AthleteHomepage";
import UserIdContext from "./src/AppContext";

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
              component={Welcome}
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
              name={ScreenNames.COACH_EMAIL_PASSWORD}
              component={CoachEmailPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ScreenNames.COACH_EMAIL_VERIFICATION}
              component={CoachEmailVerification}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ScreenNames.COACH_SPORT_INFO}
              component={CoachSportInfo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ScreenNames.COACH_POSITION_SELECTION}
              component={CoachPositionSelection}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ScreenNames.COACH_COMPLETE_PROFILE}
              component={CoachCompleteProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ScreenNames.ATHLETE_EMAIL_PASSWORD}
              component={AthleteEmailPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ScreenNames.ATHLETE_EMAIL_VERIFICATION}
              component={AthleteEmailVerification}
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
              name={ScreenNames.ATHLETE_COMPLETE_PROFILE}
              component={AthleteCompleteProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ScreenNames.COACH_HOMEPAGE}
                component={CoachHomepage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ScreenNames.ATHLETE_HOMEPAGE}
                component={AthleteHomepage}
                options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserIdContext.Provider>
    </ApolloProvider>
  );
}
