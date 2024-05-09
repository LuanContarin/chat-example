import { Socket } from 'net';

const HOST = '127.0.0.1';
const PORT = 12345;

const client = new Socket();

client.connect(PORT, HOST, () => {
    console.log(`Connected to server!`);
    client.write('Hello world');
});

client.on('data', (data) => {
    console.log(`Received from server: ${data.toString()}`);
    client.destroy();
});

client.on('close', () => {
    console.log('Connection closed!');
});