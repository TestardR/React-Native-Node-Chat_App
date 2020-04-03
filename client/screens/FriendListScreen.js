import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  itemContainerStyles: { flex: 1, flexDirection: 'row', margin: 20 },
  avatarImageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 25,
  },
  avatarNameViewStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});

const { itemContainerStyles, avatarImageStyle, avatarNameViewStyle } = styles;

const FriendListScreen = ({ navigation }) => {
  const usersOnline = useSelector((state) => state.usersOnline);
  console.log('usersOnline', usersOnline);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={usersOnline}
        renderItem={({ item }) => {
          console.log('item', item);
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Chat', {
                  name: item.username,
                })
              }
            >
              <View style={itemContainerStyles}>
                <Image style={avatarImageStyle} source={{ uri: item.avatar }} />
                <View style={avatarNameViewStyle}>
                  <Text style={{ fontSize: 25 }}>{item.username}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.username}
      />
    </View>
  );
};

export default FriendListScreen;
