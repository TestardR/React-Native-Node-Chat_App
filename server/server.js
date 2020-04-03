const Server = require('socket.io');
const io = new Server();
const messageHandler = require('./handlers/message.handler');

let currentUserId = 2;
let users = {};

function createUserAvatar() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${rand1}/${rand2}/any`;
}

/**
 * Socket.io function opening a connection
 * @function on
 * @param {string} connection
 * @param {object} socket
 */

io.on('connection', (socket) => {
  console.log('a user connected!');
  users[socket.id] = { userId: currentUserId++ };

  /*   socket.on('join', (username) => {
    users[socket.id].username = username;
    users[socket.id].avatar = createUserAvatar();
    messageHandler.handleMessage(socket, users);
  }); */
  socket.on('action', (action) => {
    switch (action.type) {
      case 'server/hello':
        console.log('Got hello event', action.data);
        socket.emit('action', { type: 'message', data: 'Good day' });
        break;
      case 'server/join':
        users[socket.id].username = action.data;
        users[socket.id].avatar = createUserAvatar();
        const values = Object.values(users);
        const onlyWithUsernames = values.filter(
          (u) => u.username !== undefined
        );
        // io emits to all the sockets
        io.emit('action', {
          type: 'users_online',
          data: onlyWithUsernames,
        });
        break;
    }
  });
});

io.listen(3001);
