import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Message } from 'primeng/api';
import { Timeline } from './interfaces/timeline';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnChanges {
  follow_up_uid!: string;
  messages!: Message[];
  visible: boolean = false;

  @Input() timeline!: Timeline[];

  @Output() RealoadFollowUp: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.messages = [];
    if(changes['timeline'].currentValue) {
      this.getTimeline();
    }
  }

  async getTimeline() {
    if (this.timeline?.length == 0) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes ninguna actividad generada.',
        },
      ];
    }
  }

  showModal() {
    this.visible = true;
  }
}
