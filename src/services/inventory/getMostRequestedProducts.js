import clientFetch from 'lib/client-fetch';

const GetMostRequestedProducts = async () => {
  try {
    const response = await clientFetch(
      'bff/v1/inventory/getMostRequestedProducts?lastDaysInNumber=7&productQuantityLimit=12',
      {
        headers: {
          apikey: process.env.REACT_APP_API_KEY_KONG,
        },
        method: 'GET',
      },
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default GetMostRequestedProducts;
