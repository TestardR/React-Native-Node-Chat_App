import React from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useDispatch } from 'react-redux';

const ChatScreen = ({ route }) => {
  const { userId } = route.params;
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={[]}
        onSend={(msg) =>
          dispatch({
            type: 'server/private-message',
            data: { text: msg[0].text, to: userId },
          })
        }
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default ChatScreen;
