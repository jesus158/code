import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { LeadService } from "../../../lead/lead.service";

@Component({
  selector: 'app-activities-modal',
  templateUrl: './activities-modal.component.html',
  styleUrls: ['./activities-modal.component.scss']

})
export class ActivitiesModalComponent implements OnInit {

  activities = signal([]);

  constructor(
    private data: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private leadService: LeadService) {}
  
  ngOnInit(): void {
    console.log('render', this.data.data.uid);
    this.getLead();
  }

  private async getLead() {
    const result = await this.leadService.get_Lead(this.data.data.uid);
    this.activities.set(result.activities);
  }

}