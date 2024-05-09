import { createServer } from 'net';

const HOST = '127.0.0.1';
const PORT = 12345;

const server = createServer(socket => {
    console.log('Client connected');

    socket.on('data', (data) => {
        console.log(`Message received: ${data.toString()}`);
        socket.write(data.toString());
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    })
});

server.listen(PORT, HOST, () => {
    console.log(`Server hosted at ${HOST}:${PORT}`);
});