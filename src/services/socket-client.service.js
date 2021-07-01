import io from 'socket.io-client';

// Llamada al socket
const socket = io('ws://devapigw.bluex.cl', {
  path: '/api/fulfillment/notifications/v1',
});

export default socket;
