import clientFetch from 'lib/client-fetch';

const GetInventoryTurnoverIndicator = async (accountId) => {
  try {
    const response = await clientFetch('bff/v1/inventory/getInventoryTurnoverIndicator', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
        accountId,
      },
      method: 'GET',
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default GetInventoryTurnoverIndicator;
