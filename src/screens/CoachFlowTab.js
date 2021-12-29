import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScreenNames from "../constants/ScreenNames";
import DisplayAthlete from "./DisplayAthlete/DisplayAthleteDeclineAccept";
import SearchForCoach from "./DisplayAthlete/SearchForCoach";
import CommunicationOrganizer from "./DisplayAthlete/CommunicationOrganizer";
import ProfilePageCoach from "./DisplayAthlete/ProfilePageCoach";
import { StyleSheet } from "react-native";
import Icon from "react-native-ico-material-design";

const Tab = createBottomTabNavigator();

const CoachFlowTab = (props) => {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.DISPLAY_ATHLETE_DECLINE_ACCEPT}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name={ScreenNames.SEARCH_FOR_COACH}
        component={SearchForCoach}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="searching-magnifying-glass"
              height={size}
              width={size}
              color="white"
            />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.DISPLAY_ATHLETE_DECLINE_ACCEPT}
        component={DisplayAthlete}
        initialParams={props.route.params}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="home-button" height={size} width={size} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.COMMUNICATION_ORGANIZER}
        component={CommunicationOrganizer}
        initialParams={props.route.params}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="black-envelope-email-symbol"
              height={size}
              width={size}
              color="white"
            />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.PROFILE_PAGE_COACH}
        component={ProfilePageCoach}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="two-men" height={size} width={size} color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "black"
  }
});

export default CoachFlowTab;
