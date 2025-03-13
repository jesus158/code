import { Component, OnInit, signal } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { LeadService } from "src/app/modules/dashboard/kanban/lead/lead.service";
import { CardActivitiesComponent } from "../card-activities/card-activities.component";


@Component({
  selector: 'app-activity-modal',
  standalone: true,
  imports: [CardActivitiesComponent],
  template: `<app-card-activities [activities]=activities() />`,
})
export class ActivityModalComponent implements OnInit {
  
  activities = signal([]);

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
    this.activities.set(result.activities);
  }
  
}