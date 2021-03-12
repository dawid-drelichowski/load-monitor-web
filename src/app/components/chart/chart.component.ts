import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { Environment } from '../../types/environment.type';
import { EnvironmentService } from '../../services/environment.service';

@Component({
  selector: 'lm-chart',
  template: `
    <google-chart
      [type]="chartType.ColumnChart"
      [data]="data"
      [columns]="['time', 'load', { role: 'style' }]"
      [options]="{
        title: 'Average load in time',
        legend: {
          position: 'none'
        },
        height: 300,
        hAxis: {
          title: 'Time (seconds)',
          viewWindow: {
            max:
              (this.config.fetchDataInterval * this.config.dataBufferSize) /
              1000,
            min: 0
          },
          gridlines: {
            count: 10
          }
        },
        vAxis: {
          title: 'Average load',
          viewWindow: {
            max: this.config.highLoadMinimumValue * 2,
            min: 0
          },
          gridlines: {
            count: 10
          }
        }
      }"
    ></google-chart>
  `,
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  @Input()
  loadValues: number[];

  config: Environment;

  get data(): (string | number)[][] {
    return this.loadValues.length > 1
      ? this.loadValues.map((value, index) => [
          (index * this.config.fetchDataInterval * this.config.dataBufferSize) /
            (1000 * this.config.dataBufferSize),
          value,
          value < this.config.highLoadMinimumValue ? '#3f8600' : '#cf1322',
        ])
      : [[0, 0, '']];
  }

  chartType = ChartType;

  constructor(environmentService: EnvironmentService) {
    this.config = environmentService.config;
  }
}
