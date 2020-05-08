const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer);


io.on("connection", (socket) => {
  socket.emit("messageFromServer", { data: "Welcome to the socketio server" });
  socket.on("messageToServer", (dataFromClient) => {
    console.log(dataFromClient);
  });
  socket.on("newMessageToServer", (msg) => {
    io.emit("messageToClients", { text: msg.text });
    // The below is the same as above as / is default path
    // io.of('/').emit("messageToClients", { text: msg.text });
  });

  // The below won't work due to the async nature of JS.
  // The event will be emitted before the client is connected to admin
  io.of('/admin').emit('welcome', 'Welcome2 to the Admin channel')
});

io.of('/admin').on('connection', socket => {
  console.log("someone connected to the admin namespace")
  io.of('/admin').emit('welcome', 'Welcome to the Admin channel')
})
