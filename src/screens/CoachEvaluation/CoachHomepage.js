import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScreenNames from "../../constants/ScreenNames";
import CoachEvaluation from "./CoachEvaluation";
import SearchForCoach from "./SearchAthlete";
import CoachCommunication from "./CoachCommunication";
import ProfilePageCoach from "../AthleteApplication/DisplayCoachProfile";
import { StyleSheet } from "react-native";
import Icon from "react-native-ico-material-design";

const Tab = createBottomTabNavigator();

const CoachHomepage = (props) => {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.COACH_EVALUATION}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name={ScreenNames.SEARCH_ATHLETE}
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
        name={ScreenNames.COACH_EVALUATION}
        component={CoachEvaluation}
        initialParams={props.route.params}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="home-button" height={size} width={size} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.COACH_COMMUNICATION}
        component={CoachCommunication}
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
        name={ScreenNames.DISPLAY_COACH_PROFILE}
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

export default CoachHomepage;
