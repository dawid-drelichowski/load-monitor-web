import { Environment } from '../app/types/environment.type';

export const environment: Environment = {
  production: true,
  loadDataUrl: `ws://${window.location.hostname}:8080`,
  highLoadMinimumValue: 1,
  highLoadOrRecoverPeriod: 120000,
  fetchDataInterval: 10000,
  dataBufferSize: 60,
};
