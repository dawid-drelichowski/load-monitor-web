// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { Environment } from '../app/types/environment.type';

export const environment: Environment = {
  production: false,
  // Url to Load monitor WebSocket server (https://github.com/dawid-drelichowski/load-monitor-socket):
  loadDataUrl: `ws://${window.location.hostname}:8080`,
  highLoadMinimumValue: 0.3,
  highLoadOrRecoverPeriod: 1000 * 10, // Time in milliseconds
  fetchDataInterval: 1000, // Time in milliseconds
  dataBufferSize: 60, // Number of buffer entries
  /*
   * fetchDataInterval and dataBufferSize are responsible for history data time frame:
   * As example one minute history time frame:
   * fetchDataInterval: 1000 - which is 1 second
   * dataBufferSize: 60 - minute has 60 seconds, fetchDataInterval * dataBufferSize is 1000 * 60 = 60000 milliseconds (60 seconds)
   */
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
