import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';
import {Environment} from '../../types/environment.type';
import {EnvironmentService} from '../../services/environment.service';

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

  private config: Environment;

  constructor(environmentService: EnvironmentService) {
    this.config = environmentService.config;
  }

  getLoadStyle(load: number): Partial<NgStyleInterface> {
    return {
      color: load < this.config.highLoadMinimumValue ? this.colors.low : this.colors.high
    };
  }
}
