import React, { useState, useEffect, useRef } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

const HomeScreen = () => {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://192.168.1.86:3001');
    socket.current.on('message', message => {
      setReceivedMessages(prevState => GiftedChat.append(prevState, message));
    });
  }, []);

  /**
 * Function emits user message to backend as well as update the UI
 * @function onSend
 * @param {object} msg
 * @return a message emitted to the backend server
 */

  const onSend = msg => {
    setReceivedMessages(prevState => GiftedChat.append(prevState, msg));
    socket.current.emit('message', msg[0].text);
  };
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={receivedMessages}
        onSend={msg => onSend(msg)}
        user={{
          _id: 1
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default HomeScreen;
