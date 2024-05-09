const express = require('express');
const http = require('http');
const socket_io = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new socket_io.Server(server);

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('User connected.');

    socket.on('chat message', (data) => {
        console.log(`Message received: ${data.message}`);
        io.emit('chat message', { user: data.user, message: data.message, time: data.time });
    });

    socket.on('disconnect', (reason) => {
        console.log(`User disconnected. Reason: ${reason}`)
    })
});

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})