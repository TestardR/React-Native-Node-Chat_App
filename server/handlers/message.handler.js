/**
 * Function creates a message object
 * @function createMessage
 * @param {object} user
 * @param {string} messageText
 * @return a message object
 */

function createMessage(user, messageText) {
  let currentMessageId = 1;
  return {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: user.userId,
      name: user.username,
      avatar: user.avatar
    }
  };
}

/**
 * Function sends message object to other users
 * @function handleMessage
 * @param {object} socket
 * @param {object} users
 * @return a broadcasted message object
 */

function handleMessage(socket, users) {
  socket.on('message', messageText => {
    const user = users[socket.id];
    const message = createMessage(user, messageText);
    console.log(message);
    socket.broadcast.emit('message', message);
  });
}

module.exports = { handleMessage };
