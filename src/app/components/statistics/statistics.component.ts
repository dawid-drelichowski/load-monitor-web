import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'lm-statistics',
  template: `
    <h2>Statistics</h2>
    <nz-statistic
      nzTitle="Current average load"
      [nzValue]="currentAverageLoad | number:'1.4'"
      [nzValueStyle]="getLoadStyle(currentAverageLoad)"
    ></nz-statistic>
    <nz-statistic
      nzTitle="Average load"
      [nzValue]="averageLoadOverTime | number:'1.4'"
      [nzValueStyle]="getLoadStyle(averageLoadOverTime)"
    ></nz-statistic>
    <nz-statistic
      nzTitle="High loads count"
      [nzValue]="highLoadsCount"
      [nzValueStyle]="{ color: colors.high }"
    ></nz-statistic>
    <nz-statistic
      nzTitle="Load recovers count"
      [nzValue]="this.loadRecoversCount"
      [nzValueStyle]="{ color: colors.low }"
    ></nz-statistic>
    <nz-statistic
      nzTitle="Number of CPU"
      [nzValue]="cpuCount | number"
    ></nz-statistic>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent {
  @Input()
  currentAverageLoad: number;

  @Input()
  averageLoadOverTime: number;

  @Input()
  cpuCount: number;

  @Input()
  highLoadsCount: number;

  @Input()
  loadRecoversCount: number;

  colors: Record<string, string> = {
    low: '#3f8600',
    high: '#cf1322'
  };

  getLoadStyle(load: number): Partial<NgStyleInterface> {
    return {
      color: load < 1 ? this.colors.low : this.colors.high
    };
  }
}
