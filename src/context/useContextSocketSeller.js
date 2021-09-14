import { io } from 'socket.io-client';
// import { SOCKET_URL } from 'config';

import React from 'react';

export const socket = io(process.env.REACT_APP_SOCKET_URL, {
  path: process.env.REACT_APP_SOCKET_PATH,
});
export const SocketContext = React.createContext();
