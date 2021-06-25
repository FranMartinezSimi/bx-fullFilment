import io from 'socket.io-client';

// Llamada al socket
const socket = io('https://devapigw.bluex.cl/');

export default socket;
