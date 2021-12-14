import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScreenNames from "../constants/ScreenNames";
import DisplayAthlete from "./DisplayAthlete/DisplayAthleteDeclineAccept";
import SearchForCoach from "./DisplayAthlete/SearchForCoach";
import ProfilePageCoach from "./DisplayAthlete/ProfilePageCoach";

const Tab = createBottomTabNavigator();

const CoachFlowTab = (props) => {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.DISPLAY_ATHLETE_DECLINE_ACCEPT}
    >
      <Tab.Screen
        name={ScreenNames.SEARCH_FOR_COACH}
        component={SearchForCoach}
      />
      <Tab.Screen
        name={ScreenNames.DISPLAY_ATHLETE_DECLINE_ACCEPT}
        component={DisplayAthlete}
      />
      <Tab.Screen
        name={ScreenNames.COMMUNICATION_PAGE}
        component={COMMUNICATION_PAGE}
      />
      <Tab.Screen
        name={ScreenNames.PROFILE_PAGE_COACH}
        component={ProfilePageCoach}
      />
    </Tab.Navigator>
  );
};

export default CoachFlowTab;
