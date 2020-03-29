const Server = require('socket.io');
const io = new Server();

let currentUserId = 2;
let currentMessageId = 1;
const userIds = {};

function createMessage(userId, messageText) {
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

io.on('connection', socket => {
  console.log('a user connected!');
  userIds[socket.id] = currentUserId++;
  socket.on('message', messageText => {
    const userId = userIds[socket.id];
    const message = createMessage(userId, messageText);
    console.log(message)
    socket.broadcast.emit('message', message);
  });
});

io.listen(3001);
