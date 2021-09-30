import { datadogRum } from '@datadog/browser-rum';

export default function ddInit() {
  datadogRum.init({
    applicationId: process.env.REACT_APP_DD_APPLICATION_ID || '',
    clientToken: process.env.REACT_APP_DD_CLIENT_TOKEN || '',
    site: 'datadoghq.com',
    service: process.env.REACT_APP_SERVICE_NAME || '',
    env: process.env.REACT_APP_ENV,
    sampleRate: 100,
    trackInteractions: true,
  });
}
