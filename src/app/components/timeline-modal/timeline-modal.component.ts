import { Component, OnInit, signal } from "@angular/core";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { LeadService } from "src/app/modules/dashboard/kanban/lead/lead.service";
import { CardTimelinesComponent } from "../card-timelines/card-timelines.component";

@Component({
  selector: 'app-timeline-modal',
  standalone: true,
  imports: [CardTimelinesComponent],
  template: `<app-card-timelines [timelines]="timelines()" />`
})
export class TimelineModalComponent implements OnInit {
  
  timelines = signal([]);

  constructor(
    private data: DynamicDialogConfig,
    private leadService: LeadService
  ) {}
  
  ngOnInit(): void {
    console.log('render', this.data.data.uid);
    this.getLead();
  }

  private async getLead() {
    const result = await this.leadService.get_Lead(this.data.data.uid);
    this.timelines.set(result.timeline);
  }
  
}