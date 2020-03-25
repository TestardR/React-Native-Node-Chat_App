const Server = require('socket.io');
const io = new Server();

io.on('connection', (socket) => {
  console.log('a user connected!');
  socket.on("message", message => {
      console.log(message)
      io.emit("message", message)
  })
});


io.listen(3001);
