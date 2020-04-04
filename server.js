const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {});

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.emit("message", "user connected");
  socket.on("private message", (message) => {
    socket.emit("message", message + " (only you see this)");
  });
  socket.on("global message", (message) => {
    io.emit("message", message + " (everybody sees this)");
  });
  socket.on("broadcast message", (message) => {
    socket.broadcast.emit(
      "message",
      message + " (everybody but you sees this)"
    );
  });
});

server.listen(5000, () => {
  console.log("server listening on port 5000");
});
