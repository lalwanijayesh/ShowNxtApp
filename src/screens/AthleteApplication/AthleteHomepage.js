import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScreenNames from "../../constants/ScreenNames";
import SearchSchool from "./SearchSchool";
import AthleteCommunication from "./AthleteCommunication";
import Icon from "react-native-ico-material-design";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SchoolInfo from "./SchoolInfo";
import DisplayAthleteProfile from "../CoachEvaluation/DisplayAthleteProfile";

const Tab = createBottomTabNavigator();
const ApplicationStack = createNativeStackNavigator();

const ApplicationScreen = (props) => {
  return (
    <ApplicationStack.Navigator
      initialRouteName={ScreenNames.SEARCH_SCHOOL}
      screenOptions={{
        headerShown: false,
      }}
    >
      <ApplicationStack.Screen
        name={ScreenNames.SEARCH_SCHOOL}
        initialParams={props.route.params}
        component={SearchSchool}
      />
      <ApplicationStack.Screen
        name={ScreenNames.SCHOOL_INFO}
        component={SchoolInfo}
      />
    </ApplicationStack.Navigator>
  );
};

const AthleteHomepage = (props) => {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.ATHLETE_APPLICATION_STACK}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name={ScreenNames.ATHLETE_APPLICATION_STACK}
        initialParams={props.route.params}
        component={ApplicationScreen}
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
        name={ScreenNames.ATHLETE_COMMUNICATION}
        component={AthleteCommunication}
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
        name={ScreenNames.DISPLAY_ATHLETE_PROFILE}
        component={DisplayAthleteProfile}
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

export default AthleteHomepage;
