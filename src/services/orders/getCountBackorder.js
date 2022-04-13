import clientFetch from 'lib/client-fetch';

const GetCountBackorder = async () => {
  try {
    const response = await clientFetch('order/v1/orders/getCountBackorder', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default GetCountBackorder;
