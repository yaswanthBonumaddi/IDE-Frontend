import { io } from 'socket.io-client';

const socket = io('http://localhost:8888');

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('file:refresh', (data) => {
    console.log('File refresh', data);
});

socket.on('terminal:data', (data) => {
    console.log('Terminal data', data);
});

export default socket;
