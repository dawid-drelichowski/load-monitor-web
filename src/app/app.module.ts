import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './components/app/app.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartComponent } from './components/chart/chart.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { TimelineComponent } from './components/timeline/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    StatisticsComponent,
    TimelineComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NzMessageModule,
    NzTimelineModule,
    NzStatisticModule,
    NzLayoutModule,
    NzIconModule,
    GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
