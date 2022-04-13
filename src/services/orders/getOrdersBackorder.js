import clientFetch from 'lib/client-fetch';

const GetOrdersBackorder = async () => {
  try {
    const response = clientFetch('order/v1/orders/getOrdersBackorder', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default GetOrdersBackorder;
