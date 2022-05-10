const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const ejs = require('ejs');
const connectHandler = require("./socket/connectHandler");
const socketHandler = require("./socket/connectHandler");


app.set('view engine','ejs');
app.set('views','view');


app.get('/',(req,res)=>{
    res.render('index');
})

server.listen(3000);

socketHandler(io);

