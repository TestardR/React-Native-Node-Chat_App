import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import JoinScreen from './screens/JoinScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Join"
        screenOptions={{
          headerTintColor: '#00E2AF',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Chat forever' }}
        />
        <Stack.Screen
          name="Join"
          component={JoinScreen}
          options={{ title: 'Chat forever' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
