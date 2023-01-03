const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// app.get('/', (req,res) => {
//     res.send('<h1>hellow world</h1>');
// });

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log("a user connected");
    socket.on('disconnect', () => {
        console.log("user disconnected");
    });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

const port = 3000;
server.listen(port, ()=>{
    console.log(`listening on the localhost:${port}`);
});

