const Server = require('socket.io');
const io = new Server();
const messageHandler = require('./handlers/message.handler')

let currentUserId = 2;
const users = {};

/**
 * Socket.io function opening a connection
 * @function on
 * @param {string} connection
 * @param {object} socket
 */

io.on('connection', socket => {
  console.log('a user connected!');
  users[socket.id] = currentUserId++;
  socket.on("join", username => {
    users[socket.id].username = username;
    messageHandler.handleMessage(socket, users)
  })
});

/**
 * Socket.io web server starter
 * @function listen
 * @param {number} port
 */

io.listen(3001);
