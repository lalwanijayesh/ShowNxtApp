import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ScreenNames from './src/screens/ScreenNames';
import UsernamePassword from './src/screens/AthleteRegister/UserNamePassword'
import AthleteSportInfo from './src/screens/AthleteRegister/AthleteSportInfo';
import AthleteHeightWeight from './src/screens/AthleteRegister/AthleteHeightWeight';
import AthleteAcademic from './src/screens/AthleteRegister/AthleteAcademic';
import AtheleteComplte from './src/screens/AthleteRegister/AthleteCompleteRegister';
import AthleteProfile from './src/screens/AthleteProfile/AthleteProfile';

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name={ScreenNames.USERNAME_PASSWORD} 
                      component={UsernamePassword} 
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
        <Stack.Screen name={ScreenNames.ATHLETE_COMPLETE_REGISTER} 
                      component={AtheleteComplte} 
                      options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.ATHLETE_PROFILE} 
                      component={AthleteProfile} 
                      options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
