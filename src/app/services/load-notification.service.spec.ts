import { LoadNotificationsService } from './load-notifications.service';
import { LoadDataService } from './load-data.service';
import { EnvironmentService } from './environment.service';
import { Subject } from 'rxjs';

describe('LoadNotificationsService', () => {
  let loadNotificationsService: LoadNotificationsService;
  let loadDataServiceMock: LoadDataService;
  let environmentServiceMock: EnvironmentService;

  beforeEach(() => {
    loadDataServiceMock = {
      socket$: new Subject(),
    } as unknown as LoadDataService;
    environmentServiceMock = {
      config: {
        highLoadOrRecoverPeriod: 10,
        highLoadMinimumValue: 1,
      },
    } as unknown as EnvironmentService;
    loadNotificationsService = new LoadNotificationsService(environmentServiceMock, loadDataServiceMock);
  });

  describe('highLoad$', () => {
    it('should emit when high load', done => {
      loadNotificationsService.highLoad$.subscribe(count => {
        expect(count).toStrictEqual(1);
        clearInterval(intervalId);
        done();
      });

      const intervalId = setInterval(
        () => loadDataServiceMock.socket$.next({ averageLoad: 1.5, cpuCount: 4 }), 1
      );
    });

    it('should emit when high load, recovered and high load again', done => {
      let averageLoad = 1.5;

      loadNotificationsService.loadRecovered$.subscribe(count => {
        expect(count).toStrictEqual(1);
        averageLoad = 1.5;
      });
      loadNotificationsService.highLoad$.subscribe(count => {
        switch (count) {
          case 1:
            averageLoad = 0.5;
            break;
          case 2:
            clearInterval(intervalId);
            done();
        }
      });

      const intervalId = setInterval(
        () => loadDataServiceMock.socket$.next({ averageLoad, cpuCount: 4 }), 1
      );
    });

    it('should emit twice when high load twice and recovered twice', done => {
      let averageLoad = 1.5;

      loadNotificationsService.loadRecovered$.subscribe(count => {
        switch (count) {
          case 1:
          case 2:
            averageLoad = 1.5;
            break;
        }
      });
      loadNotificationsService.highLoad$.subscribe(count => {
        switch (count) {
          case 1:
          case 2:
            averageLoad = 0.5;
            break;
          case 3:
            clearInterval(intervalId);
            done();
        }
      });

      const intervalId = setInterval(
        () => loadDataServiceMock.socket$.next({ averageLoad, cpuCount: 4 }), 1
      );
    });
  });

  describe('loadRecovered$', () => {
    it('should emit when load recovered', done => {
      let averageLoad = 1.5;

      loadNotificationsService.highLoad$.subscribe(count => {
        expect(count).toStrictEqual(1);
        averageLoad = 0.5;
      });
      loadNotificationsService.loadRecovered$.subscribe(count => {
        expect(count).toStrictEqual(1);
        clearInterval(intervalId);
        done();
      }, () => {}, () => console.log('loadRecovered$ completed'));

      const intervalId = setInterval(
        () => loadDataServiceMock.socket$.next({ averageLoad, cpuCount: 4 }), 1
      );
    });

    it('should emit when load recovered, high load and recovered again', done => {
      let averageLoad = 1.5;

      loadNotificationsService.highLoad$.subscribe(count => {
        switch (count) {
          case 1:
          case 2:
            averageLoad = 0.5;
            break;
        }
      });
      loadNotificationsService.loadRecovered$.subscribe(count => {
        switch (count) {
          case 1:
            averageLoad = 1.5;
            break;
          case 2:
            clearInterval(intervalId);
            done();
        }
      });

      const intervalId = setInterval(
        () => loadDataServiceMock.socket$.next({ averageLoad, cpuCount: 4 }), 1
      );
    });

    it('should emit twice when load recovered twice and high load triple', done => {
      let averageLoad = 1.5;

      loadNotificationsService.highLoad$.subscribe(count => {
        switch (count) {
          case 1:
          case 2:
          case 3:
            averageLoad = 0.5;
            break;
        }
      });
      loadNotificationsService.loadRecovered$.subscribe(count => {
        switch (count) {
          case 1:
          case 2:
            averageLoad = 1.5;
            break;
          case 3:
            clearInterval(intervalId);
            done();
        }
      });

      const intervalId = setInterval(
        () => loadDataServiceMock.socket$.next({ averageLoad, cpuCount: 4 }), 1
      );
    });
  });
});
