import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Message } from 'primeng/api';
import { ActivitiesModalComponent } from './components-activities/activities-modal/activities-modal.component';
import { Activities } from './interfaces/activities';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnChanges {
  leads_uid!: string;
  messages: Message[] = [];

  @Input() activities!: Activities[];

  @Output() RealoadFollowUp: EventEmitter<any> = new EventEmitter<void>();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['activities'].currentValue) {
      this.messages = [];
      this.activities.forEach(e => {
        e.activities_assign_to = JSON.parse(e.activities_assign_to as string)
      });
      this.getActivities()
    };
  }

  showDialog() {
  }

  getActivities() {
    if (this.activities?.length == 0) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes ninguna actividad generada.',
        },
      ];
    }
  }
}
