import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import io from 'socket.io-client';

const HomeScreen = () => {
  const [messageToSend, setMessageToSend] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://192.168.1.86:3001');
    socket.current.on('message', message => {
      setReceivedMessages(prevState => [...prevState, message]);
    });
  }, []);

  const handleMessage = () => {
    socket.current.emit('message', messageToSend);
    setMessageToSend('');
  };

  const textOfReceivedMessages = receivedMessages.map(message => {
    return <Text>{message}</Text>;
  });

  return (
    <View style={styles.container}>
      {textOfReceivedMessages}
      <Text>Hello React Native</Text>
      <TextInput
        placeholder="Enter chat message"
        value={messageToSend}
        onChangeText={text => {
          setMessageToSend(text);
        }}
        onSubmitEditing={handleMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default HomeScreen;
