import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TimelineItem } from '../../types/timeline-item.type';

@Component({
  selector: 'lm-timeline',
  template: `
    <h2>Timeline</h2>
    <nz-timeline [nzReverse]="true">
      <nz-timeline-item
        *ngFor="let item of timelineItems; trackBy: trackByTimelineItems"
        [nzColor]="item.color"
      >
        {{ item.timestamp | date:'medium' }}, {{ item.text }}
      </nz-timeline-item>
    </nz-timeline>
  `,
  styleUrls: ['./timeline.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  @Input()
  timelineItems: TimelineItem[];

  trackByTimelineItems(index: number, item: TimelineItem): number {
    return item.timestamp;
  }
}
