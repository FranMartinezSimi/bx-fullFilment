/* eslint-disable no-unreachable */
// import clientFetch from 'lib/client-fetch';

const GetNonStockOrderProducts = async () => {
  try {
    // const response = await clientFetch(
    //   'bff/v1/inventory/getMostRequestedProducts?lastDaysInNumber=7&productQuantityLimit=12',
    //   {
    //     headers: {
    //       apikey: process.env.REACT_APP_API_KEY_KONG,
    //     },
    //     method: 'GET',
    //   },
    // );

    // return response;

    return [
      {
        name: 'Camiseta UC rosada',
        sku: '987765565',
        total_orders: 5,
        missing_units: 3,
      },
      {
        name: 'Camiseta visita azul',
        sku: '987765566',
        total_orders: 5,
        missing_units: 3,
      },
      {
        name: 'Termo UC',
        sku: '987765567',
        total_orders: 5,
        missing_units: 3,
      },
      {
        name: 'Bicicleta 26"',
        sku: '987sds223',
        total_orders: 5,
        missing_units: 3,
      },
    ];
  } catch (error) {
    return Promise.reject(error);
  }
};

export default GetNonStockOrderProducts;
