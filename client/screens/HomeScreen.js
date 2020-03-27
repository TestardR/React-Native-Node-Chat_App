import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

const HomeScreen = () => {
  const [messageToSend, setMessageToSend] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://192.168.1.86:3001');
    socket.current.on('message', message => {
      setReceivedMessages(prevState => GiftedChat.append(prevState, message));
    });
  }, []);

  const onSend = message => {
    console.log(message);
    socket.current.emit('message', message[0].text);
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
