import clientFetch from 'lib/client-fetch';

const GetDownloadOrders = async ({ dateInitial = '', dateFin = '' } = {}) => {
  try {
    const response = clientFetch('order/v1/orders/getOrdersDownload', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: { dateInitial, dateFin },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default GetDownloadOrders;
