import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {LoadDataService} from '../../services/load-data.service';
import {Observable} from 'rxjs';
import {LoadData} from '../../types/load-data.type';
import {map} from 'rxjs/operators';
import {ChartType} from 'angular-google-charts';
import {LoadNotificationsService} from '../../services/load-notifications.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  template: `
    <nz-card nzTitle="Current average load">
      <span nz-typography [nzType]="(averageLoad$ | async) || 0 < 1 ? 'success' : 'danger'">
        {{ averageLoad$ | async }}
      </span>
    </nz-card>
    <nz-card nzTitle="Number of CPU">{{ cpuCount$ | async }}</nz-card>
    <nz-card nzTitle="Average load over last 10 minutes">
      <span nz-typography [nzType]="(averageLoadOverTime$ | async) || 0 < 1 ? 'success' : 'danger'">
        {{ averageLoadOverTime$ | async }}
      </span>
    </nz-card>
    <google-chart
      *ngIf="loadValuesOverTime$ | async as loadValuesOverTime"
      [type]="chartType.ColumnChart"
      [data]="loadValuesOverTime"
      [columns]="['time', 'load', { role: 'style' }]"
      [options]="{
        title: 'Average load over last 10 minutes',
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Average load'
        }
      }"
    ></google-chart>
  `,
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'Load monitor';

  private data$ = this.loadDataService.socket$ as Observable<LoadData>;

  averageLoad$: Observable<number> = this.data$.pipe(map(data => data.averageLoad));

  cpuCount$: Observable<number> = this.data$.pipe(map(data => data.cpuCount));

  loadValuesOverTime$ = this.loadDataService.loadValuesOverTime$.pipe(
    map(data => data.map((value) => ['', value, value < 0.25 ? 'blue' : 'red'])),

  );

  averageLoadOverTime$: Observable<number> = this.loadDataService.averageLoadValueOverTime$;

  chartType = ChartType;

  constructor(
    private loadDataService: LoadDataService,
    private loadNotificationService: LoadNotificationsService,
    private messageService: NzMessageService
  ) { }

  ngAfterViewInit(): void {
    this.loadDataService.start();
    this.loadNotificationService.highLoad$.subscribe(() =>  this.messageService.error('High load!!!')); // unsubscribe!!
    this.loadNotificationService.loadRecovered$.subscribe(() =>  this.messageService.success('Load recovered!!!')); // unsubscribe!!
  }

  ngOnDestroy(): void {
    this.loadDataService.stop();
  }
}
