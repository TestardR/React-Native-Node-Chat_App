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

function reducer(state = { conversations: {} }, action) {
  switch (action.type) {
    case 'users_online':
      const conversations = { ...state.conversations };
      const usersOnline = action.data;
      usersOnline.forEach((user) => {
        const id = user.userId;
        if (!conversations[id]) {
          conversations[id] = {
            messages: [],
            username: user.username,
          };
        }
      });
      console.log(conversations)
      return {
        ...state,
        usersOnline: action.data,
        conversations
      };
    case 'self_user':
      return {
        ...state,
        selfUser: action.data,
      };
    case 'private_message':
      const conversationId = action.data.conversationId;
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            messages: [
              action.data.message,
              ...state.conversations[conversationId].messages,
            ],
          },
        },
      };
    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  // console.log('new state', store.getState());
});

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
