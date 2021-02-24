import { NzTimelineItemColor } from 'ng-zorro-antd/timeline';

export interface TimelineItem {
  text: string;
  timestamp: number;
  color: NzTimelineItemColor;
}
