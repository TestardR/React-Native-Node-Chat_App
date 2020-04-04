import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { Provider } from 'react-redux';

import ChatScreen from './screens/ChatScreen';
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
    case 'users_online':
      return {
        ...state,
        usersOnline: action.data,
      };
    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  // console.log('new state', store.getState());
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
            name="Chat"
            component={ChatScreen}
            options={({ route }) => ({ title: route.params.name })}
          />
          <Stack.Screen
            name="Join"
            component={JoinScreen}
            options={{ title: 'Chat forever' }}
          />
          <Stack.Screen
            name="FriendList"
            component={FriendListScreen}
            options={{ title: 'Friends List' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
