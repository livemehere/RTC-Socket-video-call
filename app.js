const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const ejs = require("ejs");
const cors = require("cors");
const socketHandler = require("./socket/connectHandler");

app.set("view engine", "ejs");
app.set("views", "view");

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(8000);

socketHandler(io);
