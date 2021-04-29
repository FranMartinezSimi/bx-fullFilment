export const environment = process.env.REACT_APP_ENV;

export const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl)

export const APIConstans = {
  fulfillment: 'fulfillment'
}

export const apiKey = window.localStorage.getItem('bxBusinessActiveFulfillment');