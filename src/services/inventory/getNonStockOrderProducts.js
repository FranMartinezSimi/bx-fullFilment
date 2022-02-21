import clientFetch from 'lib/client-fetch';

const GetNonStockOrderProducts = async () => {
  try {
    const response = await clientFetch(
      'bff/v1/inventory/getNonStockOrderProducts',
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

export default GetNonStockOrderProducts;
