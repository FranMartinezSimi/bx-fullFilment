import { io } from 'socket.io-client';
// import { SOCKET_URL } from 'config';

import React from 'react';

export const socket = io('http://localhost:3300', {
  path: '/api/fulfillment/notifications/v1',
});
export const SocketContext = React.createContext();
