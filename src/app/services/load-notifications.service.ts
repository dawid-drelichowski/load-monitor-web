import {Inject, Injectable} from '@angular/core';
import { LoadDataService } from './load-data.service';
import { distinctUntilChanged, filter, map, pluck, scan, switchMapTo, timeInterval } from 'rxjs/operators';
import { DataSubject } from '../types/data-subject.type';
import { EnvironmentService } from './environment.service';
import {Environment} from '../types/environment.type';

@Injectable({
  providedIn: 'root'
})
export class LoadNotificationsService {
  config: Environment;

  highLoad$ = this.loadDataService.socket$.pipe(
    pluck<DataSubject, number>('averageLoad'),
    timeInterval(),
    scan((milliseconds, data) => {
      return data.value > this.config.highLoadMinimumValue ? milliseconds + data.interval : 0;
    }, 0),
    map(value => value > this.config.highLoadOrRecoverPeriod),
    distinctUntilChanged()
  );

  loadRecovered$ = this.highLoad$.pipe(
    filter(value => !value),
    switchMapTo(this.loadDataService.socket$),
    pluck<DataSubject, number>('averageLoad'),
    timeInterval(),
    scan((milliseconds, data) => {
      return data.value < this.config.highLoadMinimumValue ? milliseconds + data.interval : 0
    }, 0),
    map(value => value > this.config.highLoadOrRecoverPeriod),
    distinctUntilChanged()
  );

  constructor(environmentService: EnvironmentService, private loadDataService: LoadDataService) {
    this.config = environmentService.config;
  }
}
