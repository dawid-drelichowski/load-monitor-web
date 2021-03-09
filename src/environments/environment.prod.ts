import { Environment } from '../app/types/environment.type';

export const environment: Environment = {
  production: true,
  loadDataUrl: `ws://server937162.nazwa.pl:8080`,
  highLoadMinimumValue: 1,
  highLoadOrRecoverPeriod: 120000,
  fetchDataInterval: 10000,
  dataBufferSize: 60,
};
