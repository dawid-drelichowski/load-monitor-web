import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { LoadDataService } from '../../services/load-data.service';
import { Observable } from 'rxjs';
import { LoadData } from '../../types/load-data.type';
import { LoadNotificationsService } from '../../services/load-notifications.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TimelineItem } from '../../types/timeline-item.type';

@Component({
  selector: 'lm-app',
  template: `
    <nz-layout>
      <nz-header>
        <h1>Load monitor</h1>
      </nz-header>
      <nz-content>
        <lm-chart
          *ngIf="loadDataService.loadValuesOverTime$ | async as loadValues"
          [loadValues]="loadValues"
        ></lm-chart>
        <div class="columns">
          <lm-statistics
            *ngIf="data$ | async as data"
            [currentAverageLoad]="data.averageLoad"
            [averageLoadOverTime]="(loadDataService.averageLoadValueOverTime$ | async) || 0"
            [highLoadsCount]="highLoadsCount"
            [loadRecoversCount]="loadRecoversCount"
            [cpuCount]="data.cpuCount"
          ></lm-statistics>
          <lm-timeline [timelineItems]="timelineItems"></lm-timeline>
      </div>
      </nz-content>
      <nz-footer>© Dawid Drelichowski</nz-footer>
    </nz-layout>
  `,
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  timelineItems: TimelineItem[] = [{
    text: 'Monitoring started',
    timestamp: Date.now(),
    color: 'blue'
  }];

  highLoadsCount = 0;

  loadRecoversCount = 0;

  data$ = this.loadDataService.socket$ as Observable<LoadData>;

  constructor(
    public loadDataService: LoadDataService,
    private loadNotificationService: LoadNotificationsService,
    private messageService: NzMessageService
  ) { }

  ngAfterViewInit(): void {
    this.loadDataService.start();
    this.loadNotificationService.highLoad$.subscribe(() => {
      this.messageService.error('High load');
      this.timelineItems.push({ text: 'High load', timestamp: Date.now(), color: 'red' });
      this.highLoadsCount++;
    }); // unsubscribe!!
    this.loadNotificationService.loadRecovered$.subscribe(() => {
      this.messageService.success('Load recovered');
      this.timelineItems.push({ text: 'Load recovered', timestamp: Date.now(), color: 'green' });
      this.loadRecoversCount++;
    }); // unsubscribe!!
  }

  ngOnDestroy(): void {
    this.loadDataService.stop();
  }
}
