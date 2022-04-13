import clientFetch from 'lib/client-fetch';

const ValidateExistingSku = async ({ sku, accountId, key }) => {
  try {
    const response = await clientFetch('inventory/v1/services/getSKU', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        warehouse: 'bx1',
        sku,
        account_id: accountId,
        key,
      },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default ValidateExistingSku;
