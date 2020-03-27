const Server = require('socket.io');
const io = new Server();

/* const message = {
  _id: 1,
  text: 'Romain, whats up with you lately ? :)',
  createdAt: new Date(),
  user: {
    _id: 2,
    name: 'React Native',
    avatar: 'https://placeimg.com/140/140/any'
  }
}; */

io.on('connection', socket => {
  console.log('a user connected!');
  socket.on('message', message => {
    console.log(message);
    io.emit('message', message);
  });
});

io.listen(3001);
