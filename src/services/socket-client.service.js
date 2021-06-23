import io from 'socket.io-client';

const socket = io('https://devapigw.bluex.cl/api/fulfillment/notifications/v1', { extraHeaders: { apikey: 'PDY4iyrXsHe16a8OTDl5OghRpJ25qSIt' } });

export default socket;
