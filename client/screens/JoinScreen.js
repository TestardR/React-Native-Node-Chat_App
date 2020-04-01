import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

const JoinScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        resizeMode="contain"
        style={{ flex: 1 }}
        source={require('../assets/chat.png')}
      />
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <TextInput
          onChangeText={text => setUsername(text)}
          value={username}
          style={{ fontSize: 30, textAlign: 'center' }}
          placeholder="Enter your username"
        />
        <Button
          title="Join Chat"
          onPress={() =>
            navigation.navigate('Home', {
              username
            })
          }
        />
      </View>

      {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default JoinScreen;
