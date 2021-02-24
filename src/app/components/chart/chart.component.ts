import { Component, Input } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'lm-chart',
  template: `
    <google-chart
      [type]="ChartType.ColumnChart"
      [data]="data"
      [columns]="['time', 'load', { role: 'style' }]"
      [options]="{
        title: 'Average load',
        legend: {
          position: 'none'
        },
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Average load'
        }
      }"
    ></google-chart>
  `,
  styleUrls: ['./chart.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush, // to be fixed
})
export class ChartComponent {
  @Input()
  loadValues: number[];

  get data(): (string | number)[][] {
    return this.loadValues.map(value => ['', value, value < 1 ? '#3f8600' : '#cf1322']).slice(-10);
  }

  ChartType = ChartType;
}
