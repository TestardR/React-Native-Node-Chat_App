const Server = require('socket.io');
const io = new Server();
const messageHandler = require('./handlers/message.handler')

let currentUserId = 2;
const userIds = {};



io.on('connection', socket => {
  console.log('a user connected!');
  userIds[socket.id] = currentUserId++;
  messageHandler.handleMessage(socket, userIds)
  
});

io.listen(3001);
