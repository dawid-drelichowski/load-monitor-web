export interface Environment {
  production: boolean;
  loadDataUrl: string;
  highLoadMinimumValue: number;
  highLoadOrRecoverPeriod: number;
  fetchDataInterval: number;
  dataBufferSize: number;
}
