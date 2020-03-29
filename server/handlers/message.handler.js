function createMessage(userId, messageText) {
  let currentMessageId = 1;
  return {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: userId,
      name: 'Test user',
      avatar: 'https://placeimg.com/140/140/any'
    }
  };
}

function handleMessage(socket, userIds) {
  socket.on('message', messageText => {
    const userId = userIds[socket.id];
    const message = createMessage(userId, messageText);
    console.log(message);
    socket.broadcast.emit('message', message);
  });
}

module.exports = { handleMessage };
