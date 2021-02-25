import { Injectable } from '@angular/core';
import { LoadDataService } from './load-data.service';
import {
  filter,
  map,
  pluck,
  scan,
  skipWhile,
  timeInterval
} from 'rxjs/operators';
import { DataSubject } from '../types/data-subject.type';
import { EnvironmentService } from './environment.service';
import { Environment } from '../types/environment.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadNotificationsService {
  config: Environment;

  private highLoadEmitted = false;

  private loadRecoveredEmitted = false;

  private highLoadsCount = 0;

  private loadRecoversCount = 0;

  highLoad$: Observable<number> = this.loadDataService.socket$.pipe(
    pluck<DataSubject, number>('averageLoad'),
    timeInterval(),
    scan((milliseconds, data) => {
      return data.value > this.config.highLoadMinimumValue ? milliseconds + data.interval : 0;
    }, 0),
    filter(value => (value > this.config.highLoadOrRecoverPeriod) && !this.highLoadEmitted),
    map(() => {
      this.highLoadEmitted = true;
      this.loadRecoveredEmitted = false;
      return ++this.highLoadsCount;
    }),
  );

  loadRecovered$: Observable<number> = this.loadDataService.socket$.pipe(
    skipWhile(() => !this.highLoadEmitted),
    pluck<DataSubject, number>('averageLoad'),
    timeInterval(),
    scan((milliseconds, data) => {
      return data.value < this.config.highLoadMinimumValue ? milliseconds + data.interval : 0;
    }, 0),
    filter(value => (value > this.config.highLoadOrRecoverPeriod) && !this.loadRecoveredEmitted),
    map(() => {
      this.loadRecoveredEmitted = true;
      this.highLoadEmitted = false;
      return ++this.loadRecoversCount;
    }),
  );

  constructor(environmentService: EnvironmentService, private loadDataService: LoadDataService) {
    this.config = environmentService.config;
  }
}
