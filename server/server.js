const Server = require('socket.io');
const io = new Server();
const messageHandler = require('./handlers/message.handler')

let currentUserId = 2;
const userIds = {};

/**
 * Socket.io function opening a connection
 * @function on
 * @param {string} connection
 * @param {object} socket
 */

io.on('connection', socket => {
  console.log('a user connected!');
  userIds[socket.id] = currentUserId++;
  messageHandler.handleMessage(socket, userIds)
});

/**
 * Socket.io web server starter
 * @function listen
 * @param {num} port
 */


io.listen(3001);
