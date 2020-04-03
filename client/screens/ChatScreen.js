import React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';

const ChatScreen = ({ route }) => {
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={[]}
       /*  onSend={(msg) => onSend(msg)} */
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default ChatScreen;
