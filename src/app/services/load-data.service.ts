import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { DataActionNames } from '../types/data-action-names.type';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { DataSubject } from '../types/data-subject.type';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {
  socket$: WebSocketSubject<DataSubject> = webSocket(environment.loadDataUrl);

  private loadValuesBuffer: number[] = [];

  loadValuesOverTime$: Observable<number[]> = this.socket$.pipe(
    pluck<DataSubject, number>('averageLoad'),
    map(averageLoad => {
      if (this.loadValuesBuffer.length === environment.dataBufferSize) {
        this.loadValuesBuffer.shift();
      }
      this.loadValuesBuffer.push(averageLoad);

      return this.loadValuesBuffer;
    })
  );

  averageLoadValueOverTime$: Observable<number> = this.loadValuesOverTime$.pipe(
    map(data => data?.length
      ? data.reduce((result, current) => result + current, 0) / data.length
      : 0
    )
  );

  start(): void {
    this.socket$.next({
      name: DataActionNames.Start,
      interval: environment.fetchDataInterval
    });
  }

  stop(): void {
    this.socket$.next({ name: DataActionNames.Stop });
  }
}