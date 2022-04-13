import clientFetch from 'lib/client-fetch';

const AddProducts = async ({ accountId, key, products }) => {
  try {
    const productsToArray = Array.isArray(products) ? products : [products];
    const response = await clientFetch('inventory/v1/services/addProducts', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        warehouse: 'bx1',
        account_id: accountId,
        key,
        products: productsToArray,
      },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default AddProducts;
