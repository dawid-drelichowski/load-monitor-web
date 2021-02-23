import { Injectable } from '@angular/core';
import { LoadDataService } from './load-data.service';
import {distinctUntilChanged, filter, map, pluck, scan, switchMapTo, timeInterval} from 'rxjs/operators';
import {DataSubject} from '../types/data-subject.type';

@Injectable({
  providedIn: 'root'
})
export class LoadNotificationsService {
  constructor(private loadDataService: LoadDataService) { }

  highLoad$ = this.loadDataService.socket$.pipe(
    pluck<DataSubject, number>('averageLoad'),
    timeInterval(),
    scan((milliseconds, data) => {
      return data.value > 0.2 ? milliseconds + data.interval : 0;
    }, 0),
    map(value => value > 5000),
    distinctUntilChanged()
  );

  loadRecovered$ = this.highLoad$.pipe(
    filter(value => !value),
    switchMapTo(this.loadDataService.socket$),
    pluck<DataSubject, number>('averageLoad'),
    timeInterval(),
    scan((milliseconds, data) => data.value < 0.5 ? milliseconds + data.interval : 0, 0),
    map(value => value > 5000),
    distinctUntilChanged()
  );
}
