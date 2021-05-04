import {apiUrl, APIConstans} from '../config'

export function clientFetch(endpoint, {body, ...customConfig} = {}) {
  const headers = {'content-type': 'application/json'}
  const apiKeys = JSON.parse(window.localStorage.getItem('bxBusinessActiveFulfillment'))

  console.log('endpoint', endpoint);
  console.log('customConfig', customConfig);
  console.log('customConfig', customConfig);
  console.log('apiKeys', apiKeys);
  
  if (apiKeys) {
    headers.key = apiKeys.key
    headers.account_id = apiKeys.account_id
  }
  const config = {
    method: 'POST',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  return window.fetch(`${apiUrl}/${APIConstans.fulfillment}/${endpoint}`, config)
    .then(async response => {
      if (response.status >= 500) {
        const errorMessage = await response.text()
        console.log('errorMessage', errorMessage)
        return Promise.reject(new Error(errorMessage))
      }
      if (response.status === 401) {
        const errorMessage = await response.text()
        return Promise.reject(new Error(errorMessage))
      }
      if (response.ok) {
        return await response.json()
      } else {
        const errorMessage = await response.text()
        return Promise.reject(new Error(errorMessage))
      }
    })
}