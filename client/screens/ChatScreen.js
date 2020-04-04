import React from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';

const ChatScreen = ({ route }) => {
  const { userId } = route.params;
  const dispatch = useDispatch();
  const selfUser = useSelector((state) => state.selfUser);
  const conversations = useSelector((state) => state.conversations);
  const messages = conversations[userId].messages;

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={messages}
        onSend={(msg) =>
          dispatch({
            type: 'private_message',
            data: { message: msg[0], conversationId: userId },
          })
        }
        user={{
          _id: selfUser,
        }}
      />
    </View>
  );
};

export default ChatScreen;
