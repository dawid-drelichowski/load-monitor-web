import { Environment } from '../app/types/environment.type';

export const environment: Environment = {
  production: true,
  loadDataUrl: `wss://load-monitor.ey.r.appspot.com`,
  highLoadMinimumValue: 1,
  highLoadOrRecoverPeriod: 120000,
  fetchDataInterval: 10000,
  dataBufferSize: 60,
};
