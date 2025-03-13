import { Component } from '@angular/core';

@Component({
  selector: 'app-leads-calendar',
  templateUrl: './leads-calendar.component.html',
  styleUrls: ['./leads-calendar.component.scss'],
})
export class LeadsCalendarComponent {
  selectedValue = Date.now();

  listDataMap = {
    eight: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
    ],
    ten: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'error', content: 'This is error event.' },
    ],
    eleven: [
      { type: 'warning', content: 'This is warning event' },
      { type: 'success', content: 'This is very long usual event........' },
      { type: 'error', content: 'This is error event 1.' },
      { type: 'error', content: 'This is error event 2.' },
      { type: 'error', content: 'This is error event 3.' },
      { type: 'error', content: 'This is error event 4.' },
    ],
  };

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
    }
    return null;
  }

  selectChange(select: Date): void {
    this.selectedValue = Number(select);
    /*  console.log(`Select value: ${select}`); */
  }
}
