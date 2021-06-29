import io from 'socket.io-client';

// Llamada al socket
const socket = io('https://devapigw.bluex.cl', {
  path: '/api/fulfillment/notifications/v1',
  reconnectionAttemps: 0,
});

export default socket;
