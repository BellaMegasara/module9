const express = require("express");
const app = express();
const http = require("http");

const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  // CONNECTION MESSAGES
  io.emit("connection", "a user connected");
  socket.on("disconnect", () => {
    io.emit("connection", "a has disconnected connected");
  });
  // CHAT MESSAGE
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
