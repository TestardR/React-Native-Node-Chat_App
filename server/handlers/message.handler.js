/**
 * Function creates a message object
 * @function createMessage
 * @param {string} userId
 * @param {string} messageText
 * @return a message object 
 */

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

/**
 * Function sends message object to other users
 * @function handleMessage
 * @param {object} socket
 * @param {array} userIds
 * @return a broadcasted message object
 */

function handleMessage(socket, userIds) {
  socket.on('message', messageText => {
    const userId = userIds[socket.id];
    const message = createMessage(userId, messageText);
    console.log(message);
    socket.broadcast.emit('message', message);
  });
}

module.exports = { handleMessage };
