import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScreenNames from "../../constants/ScreenNames";
import SchoolSearch from "../SchoolSearch";
import CommunicationAthlete from "./CommunicationAthlete";
import AthleteComplete from "../AthleteRegister/AthleteComplete";
import Icon from "react-native-ico-material-design";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const AthleteFlowTab = (props) => {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.SCHOOL_SEARCH}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name={ScreenNames.SCHOOL_SEARCH}
        component={SchoolSearch}
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
        name={ScreenNames.ATHLETE_COMPLETE} // TODO: change this to the actual component once we have it
        component={AthleteComplete}
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
    backgroundColor: "black",
  },
});

export default AthleteFlowTab;
