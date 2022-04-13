import clientFetch from 'lib/client-fetch';

const GetOrdersList = async ({ status } = {}) => {
  try {
    const response = await clientFetch('order/v1/orders/getOrdersList', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        page: 1,
        warehouse: 'bx1',
        status: status || 'all',
      },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default GetOrdersList;
