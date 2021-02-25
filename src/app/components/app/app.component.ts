import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { LoadDataService } from '../../services/load-data.service';
import { Observable, Subject } from 'rxjs';
import { LoadData } from '../../types/load-data.type';
import { LoadNotificationsService } from '../../services/load-notifications.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TimelineItem } from '../../types/timeline-item.type';
import { takeUntil } from 'rxjs/operators';

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

  private destroy$ = new Subject<void>();

  constructor(
    public loadDataService: LoadDataService,
    private loadNotificationService: LoadNotificationsService,
    private messageService: NzMessageService
  ) { }

  ngAfterViewInit(): void {
    this.loadDataService.start();
    this.loadNotificationService.highLoad$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => {
        const text = 'High load';

        this.messageService.error(text);
        this.timelineItems.push({ text, timestamp: Date.now(), color: 'red' });
        this.highLoadsCount = count;
      });
    this.loadNotificationService.loadRecovered$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => {
        const text = 'Load recovered';

        this.messageService.success(text);
        this.timelineItems.push({ text, timestamp: Date.now(), color: 'green' });
        this.loadRecoversCount = count;
      });
  }

  ngOnDestroy(): void {
    this.loadDataService.stop();
    this.destroy$.next();
  }
}
