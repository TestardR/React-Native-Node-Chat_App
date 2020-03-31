import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

const JoinScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        resizeMode="contain"
        style={{ flex: 1 }}
        source={require('../assets/chat.png')}
      />
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <TextInput style={{ fontSize: 30, textAlign: "center" }} placeholder="Enter your username" />
        <Button title="Join Chat" />
      </View>

      {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default JoinScreen;
