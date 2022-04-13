import clientFetch from 'lib/client-fetch';

const GetProductHistory = async ({ sku, startDate, endDate }) => {
  try {
    const response = await clientFetch(
      `bff/v1/product_history/findByDateRange/${sku}?startDate=${startDate}&endDate=${endDate}`,
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

export default GetProductHistory;
