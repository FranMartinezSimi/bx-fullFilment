import clientFetch from 'lib/client-fetch';

const GetProductsList = async () => {
  try {
    const response = await clientFetch('bff/v1/inventory/getProductsList', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        page: 1,
        warehouse: 'bx1',
        status: 'all',
      },
    });

    return response?.products || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

export default GetProductsList;
