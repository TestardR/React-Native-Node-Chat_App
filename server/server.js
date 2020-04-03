const Server = require('socket.io');
const io = new Server();
const messageHandler = require('./handlers/message.handler');
const uuidv1 = require('uuid/v1');

let users = {};

function createUserAvatar() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${rand1}/${rand2}/any`;
}

function createUsersOnline() {
  const values = Object.values(users);
  const onlyWithUsernames = values.filter((u) => u.username !== undefined);
  return onlyWithUsernames;
}

/**
 * Socket.io function opening a connection and dispatching actions
 * @function on
 * @param {string} connection
 * @param {object} socket
 */

io.on('connection', (socket) => {
  console.log('a user connected!');
  users[socket.id] = { userId: uuidv1() };
  socket.on('join', (username) => {
    users[socket.id].username = username;
    users[socket.id].avatar = createUserAvatar();
    messageHandler.handleMessage(socket, users);
  });
  socket.on('disconnet', () => {
    delete users[socket.id];
    io.emit('action', { type: 'users_online', data: createUsersOnline() });
  });
  socket.on('action', (action) => {
    switch (action.type) {
      case 'server/hello':
        console.log('Got hello event', action.data);
        socket.emit('action', { type: 'message', data: 'Good day' });
        break;
      case 'server/join':
        users[socket.id].username = action.data;
        users[socket.id].avatar = createUserAvatar();
        // io emits to all the sockets
        io.emit('action', {
          type: 'users_online',
          data: createUsersOnline(),
        });
        break;
    }
  });
});

io.listen(3001);
