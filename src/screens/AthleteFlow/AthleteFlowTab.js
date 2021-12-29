import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScreenNames from "../../constants/ScreenNames";
import SchoolSearch from "../ApplyToSchool/SchoolSearch";
import CommunicationAthlete from "./CommunicationAthlete";
import Icon from "react-native-ico-material-design";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SchoolInfo from "../ApplyToSchool/SchoolInfo";
import DisplayAthleteProfile from "../DisplayAthlete/DisplayAthleteProfile";

const Tab = createBottomTabNavigator();
const ApplicationStack = createNativeStackNavigator();

const ApplicationScreen = (props) => {
  return (
    <ApplicationStack.Navigator
      initialRouteName={ScreenNames.SCHOOL_SEARCH}
      screenOptions={{
        headerShown: false,
      }}
    >
      <ApplicationStack.Screen
        name={ScreenNames.SCHOOL_SEARCH}
        initialParams={props.route.params}
        component={SchoolSearch}
      />
      <ApplicationStack.Screen
        name={ScreenNames.SCHOOL_INFO}
        component={SchoolInfo}
      />
    </ApplicationStack.Navigator>
  );
};

const AthleteFlowTab = (props) => {
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
        component={CommunicationAthlete}
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

export default AthleteFlowTab;
