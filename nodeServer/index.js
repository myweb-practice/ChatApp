// node sever which will handle socket io connections
const {Server} = require('socket.io')
const users = {};
const express = require('express');
const app = express()
const cors = require('cors');
const http = require('http');

const server = http.createServer(app)
const io = new Server(server);


app.use(cors())

app.use(express.static('public'))


io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        console.log("New user", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('recieve', {message: message, name: user[socket.id]})
    })
});

server.listen(8000);