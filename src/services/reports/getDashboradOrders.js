import clientFetch from 'lib/client-fetch';

const GetDashboradOrders = async () => {
  try {
    const response = await clientFetch('order/v1/orders/getDashboradOrders', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        page: 1,
        warehouse: 'bx1',
        status: 'all',
      },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default GetDashboradOrders;
