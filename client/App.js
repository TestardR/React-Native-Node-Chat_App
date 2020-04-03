import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { Provider } from 'react-redux';

import HomeScreen from './screens/HomeScreen';
import JoinScreen from './screens/JoinScreen';
import FriendListScreen from './screens/FriendListScreen';

const socket = io('http://192.168.1.86:3001');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

function reducer(state = {}, action) {
  switch (action.type) {
    case 'message':
      return {
        ...state,
        message: action.data,
      };
    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  console.log('new state', store.getState());
});

store.dispatch({ type: 'server/hello', data: 'Hello!' });

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Join"
          screenOptions={{
            headerTintColor: '#00E2AF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
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
          <Stack.Screen
            name="FriendList"
            component={FriendListScreen}
            options={{ title: 'Chat forever' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
